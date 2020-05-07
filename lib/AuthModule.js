import { auth as authStore } from './store'
import Http from './http'
import Api from './api'
import Storage from './storage'

class AuthModule {
  constructor (ctx, opts) {
    this.ctx = ctx
    this.opts = opts

    this.storage = null
    this.store = null
    this.api = null
    this.http = null

    this._init()
  }

  _init () {
    this._initHttp()
    this._initApi()
    this._initStoreModule()
    this._initStorage()

    this._startAuth()
  }

  async _startAuth () {
    if (process.client) {
      const data = this._getSession()
      if (data.token) {
        this.http.setToken(data)
        await this.refreshToken()
        await this.fetchUser()
      }
    }
  }

  _initStoreModule () {
    const { store } = this.ctx
    const { namespace } = this.opts

    store.registerModule(
      'auth',
      authStore(this.api, this.opts),
      {
        preserveState: Boolean(store.state[namespace]) // if the store module already exists, preserve it
      }
    )

    this.store = store
  }

  _initStorage () {
    if (process.client) {
      this.storage = new Storage()
    }
  }

  _initHttp () {
    const { $axios } = this.ctx
    this.http = Http($axios)
    this._initInterceptors()
  }

  _getUpdatedConfig (config) {
    config.headers.common.Authorization = `Bearer ${this.http.token}`

    return config
  }

  _initInterceptors () {
    this.http.interceptors.request.use(
      async (config) => {
        if (config.url === '/auth/refresh-token') {
          this.http.setRefreshToken()
          return config
        }

        if (this.http.token === null) {
          return config
        }

        if (this.http.refresh === null) {
          return config
        }

        if (Date.now() >= this.http.expiresAt) {
          await this.refreshToken()
          // Do something before request is sent
          config = this._getUpdatedConfig(config)
        }

        return config
      }
    )
  }

  _initApi () {
    this.api = new Api(this.http)
  }

  _clearSession () {
    this.store.dispatch({ type: 'auth/logout' }, { root: true })
    const keys = ['token', 'refresh', 'expiresIn']

    keys.forEach((key) => {
      if (this.storage.setStorage('local').has(key)) {
        this.storage.setStorage('local').remove(key)
      }

      if (this.storage.setStorage('session').has(key)) {
        this.storage.setStorage('session').remove(key)
      }
    })
  }

  _getSession () {
    const data = {}
    const keys = ['token', 'refresh', 'expiresIn']

    keys.forEach((key) => {
      let value = null
      if (this.storage.setStorage('local').has(key)) {
        value = this.storage.setStorage('local').get(key)
      }

      if (!value && this.storage.setStorage('session').has(key)) {
        value = this.storage.setStorage('session').get(key)
      }

      if (!data[key] && value) {
        data[key] = value
      }
    })

    return data
  }

  _setSession ({ token, refresh, expiresIn, remember }) {
    this.store.dispatch({ type: 'auth/login', token, refresh, expiresIn }, { root: true })
    this.storage.setStorage(remember ? 'local' : 'session')
    this.storage.set('token', token)
    this.storage.set('refresh', refresh)
    this.storage.set('expiresIn', expiresIn)
  }

  async register (data) {
    try {
      const responseData = await this.api.auth.register(data)
      this._setSession(responseData)
      await this.fetchUser()
      return Promise.resolve()
    } catch (e) {
      this._clearSession()
      return Promise.reject(e)
    }
  }

  async login (data) {
    try {
      const responseData = await this.api.auth.login(data)
      this._setSession(responseData)
      await this.fetchUser()
    } catch (e) {
      this._clearSession()
      return Promise.reject(e)
    }
  }

  async logout () {
    try {
      await this.api.auth.logout()
      this._clearSession()
    } catch (e) {
      this._clearSession()
      return Promise.reject(e)
    }
  }

  async refreshToken () {
    try {
      const data = await this.api.auth.refreshToken()
      const { token, refresh, expiresIn } = data
      this.store.dispatch({ type: 'auth/setToken', token, refresh, expiresIn }, { root: true })
      data.remember = this.storage.setStorage('local').has(token)
      this._setSession(data)
      return { token, refresh, expiresIn }
    } catch (e) {
      this._clearSession()
      return Promise.reject(e)
    }
  }

  async fetchUser () {
    try {
      const user = await this.api.auth.fetchUser()
      this.store.dispatch({ type: 'auth/setUser', user }, { root: true })
    } catch (e) {
      this._clearSession()
    }
  }

  get isLoggedIn () {
    return !!this.store.getters['auth/isLoggedIn']
  }

  get isGuest () {
    return !this.isLoggedIn
  }
}

export default AuthModule
