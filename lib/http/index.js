import prepareData from './prepareData'
import hasErrors from './hasErrors'

export default (http) => {
  return {
    expiresAt: null,
    expiresIn: null,
    refresh: null,
    token: null,

    setRefreshToken () {
      http.setHeader('X-Refresh', this.refresh)
    },

    unsetRefreshToken () {
      delete http.defaults.headers.common['X-Refresh']
    },

    setToken ({ token, refresh, expiresIn }) {
      this.expiresAt = Date.now() + (expiresIn * 1000)
      this.expiresIn = expiresIn
      this.refresh = refresh
      this.token = token

      http.setToken(token, 'Bearer')
    },

    unsetToken () {
      this.expiresIn = null
      this.refresh = null
      this.token = null
      delete http.defaults.headers.common.Authorization
      this.unsetRefreshToken()
    },

    get interceptors () {
      return http.interceptors
    },

    post (url, data) {
      return this.request('post', url, data)
    },

    get (url, data) {
      return this.request('get', url, data)
    },

    update (url, data) {
      return this.request('update', url, data)
    },

    delete (url, data) {
      return this.request('delete', url, data)
    },

    async request (method, url, data) {
      if (!http) {
        await throw new Error('Axios is not installed, could you provide it please')
      }

      return http.request({
        method,
        url,
        data
      })
        .then(prepareData)
        .catch(hasErrors)
    }
  }
}
