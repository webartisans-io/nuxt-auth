import authStore from './store'
import Http from './http'
import Api from './api'
import Storage from './storage'

class AuthModule {
  
  constructor (ctx, opts) {
    this.ctx = ctx
    this.opts = opts
    
    this._initHttp()
    this._initApi()
    this._initStoreModule()
    this._getSession()
  }
  
  _initHttp () {
    const { $axios } = this.ctx
    this.http = Http($axios)
    this._initInterceptors()
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
          this.http.setRefreshToken()
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
  
  _initStoreModule () {
    const { store } = this.ctx
    const { namespace } = this.opts
    
    store.registerModule(
      'auth',
      authStore,
      {
        preserveState: Boolean(store.state[namespace]) // if the store module already exists, preserve it
      }
    )
    
    store.subscribe(async (mutation, state) => {
      if (mutation.type === 'auth/USER_WAS_LOGGED_IN' ) {
        this.ctx.redirect(this.opts.redirects.dashboard)
        try {
          const user = await this.fetchUser()
          this.store.dispatch({ type: 'auth/setUser', user }, { root: true })
        } catch (e) {
        
        }
      }
      
      if (mutation.type === 'auth/USER_WAS_LOGGED_OUT') {
        try {
          this.ctx.redirect(this.opts.redirects.login)
        } catch (e) {
        
        }
      }
    })
    this.store = store
  }
  
  _getSession () {
    let data = this.ctx.$cookies.get('session', { parseJSON: true })
    
    if (!data) {
      data = { token: null, refresh: null, expiresIn: null, remember: null }
    }
    
    if (data.token !== null) {
      this.http.setToken(data)
      // this.storage.set('session', data)
  
      this.store.dispatch({ type: 'auth/login', ...data}, { root: true })
    }
  }
  
  _setSession (data, login = false) {
    this.ctx.$cookies.set('session', JSON.stringify(data))
    // this.storage.set('session', data)
    let action = login ? 'auth/login' : 'auth/setToken'
    this.store.dispatch({ type: action, ...data}, { root: true })
  }
  
  _clearSession () {
    this.ctx.$cookies.set('session', undefined, {
      expires: new Date
    })
    this.store.dispatch({ type: 'auth/logout' }, { root: true })
  }
  
  async login (data) {
    try {
      const responseData = await this.api.auth.login(data)
      this._setSession(responseData, true)
      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }
  
  async register (data) {
    try {
      const responseData = await this.api.auth.register(data)
      this._setSession(responseData, true)
      return Promise.resolve()
    } catch (e) {
      this._clearSession()
      return Promise.reject(e)
    }
    
  }
  
  async logout () {
    try {
      this._clearSession()
      this.api.auth.logout()
      .then(() => {
        return Promise.resolve()
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }
  
  async fetchUser () {
    try {
      const user = await this.api.auth.fetchUser()
      this.store.dispatch({ type: 'auth/setUser', user }, { root: true })
    } catch (e) {
      this._clearSession()
      return Promise.reject(e)
    }
  }
  
  async refreshToken () {
    try {
      const data = await this.api.auth.refreshToken()
      this._setSession(data)
    } catch (e) {
      this._clearSession()
      return Promise.reject(e)
    }
  }
  
  get isLoggedIn () {
    return !!this.ctx.$cookies.get('session')
  }

  get isGuest () {
    return !this.isLoggedIn
  }
}

export default AuthModule
