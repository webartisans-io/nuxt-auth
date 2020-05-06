import { auth as authStore } from './store'
import Http from './http'
import Api from './api'

class AuthModule {
	constructor (ctx, opts)  {
		
		this.ctx = ctx
		this.opts = opts

		this.store = null
		this.api = null
		this.http = null

		this._init()
	}

	_init(){
		this._initHttp()
		this._initApi()
		this._initStoreModule()
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

	_initHttp () {
		const { $axios } = this.ctx
		this.http = Http($axios)
	}

	_initApi () {
		this.api = Api(this.http)
	}
	
	async register (data) {
		try {
			let { token } = await this.api.auth.register(data)
			this.store.dispatch({ type: 'auth/login', token: token }, { root: true})
			await this.fetchUser()
		} catch (e) {
			console.warn('Some error occurred', {e})
			this.store.dispatch({ type: 'auth/logout' }, { root: true})
		}
	}
	
	async login (data) {
		try {
			let { token }  = await this.api.auth.login(data)
			this.store.dispatch({ type: 'auth/login', token: token }, { root: true})
			await this.fetchUser()
		} catch (e) {
			console.warn('Some error occurred', {e})
			this.store.dispatch({ type: 'auth/logout' }, { root: true})
		}
	}
	
	async logout () {
		try {
			let user  = await this.api.auth.logout()
			this.store.dispatch({ type: 'auth/logout' }, { root: true})
		} catch (e) {
			console.warn('Some error occurred', {e})
		}
	}
	
	async fetchUser () {
		try {
			let user  = await this.api.auth.fetchUser()
			this.store.dispatch({ type: 'auth/setUser', user }, { root: true})
		} catch (e) {
		
		}
	}
	
	get isLoggedIn () {
		return this.store.getters['auth/isLoggedIn']
	}
}

export default AuthModule
