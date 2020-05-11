import ApiModule from './module'

class Auth extends ApiModule {
  /**
   *
   * @param data
   * @returns {*}
   */
  register (data) {
    return this.client.post('/auth/register', data)
      .then((data) => {
        this.client.setToken(data)
        return Promise.resolve(data)
      })
  }
  
  /**
   *
   * @param data
   * @returns {*}
   */
  login (data) {
    return this.client.post('/auth/login', data)
      .then((data) => {
        this.client.setToken(data)
        return Promise.resolve(data)
      })
  }
  
  /**
   *
   * @returns {*}
   */
  logout () {
    return this.client.post('/auth/logout')
      .then((response) => {
        this.client.unsetToken()
        return Promise.resolve(response)
      })
  }
  
  /**
   *
   * @returns {*}
   */
  fetchUser () {
    return this.client.get('/auth/me')
  }
  
  /**
   *
   * @returns {*}
   */
  refreshToken () {
    this.client.setRefreshToken()

    return this.client.get('/auth/refresh-token')
      .then((data) => {
        this.client.setToken(data)
        this.client.unsetRefreshToken()
        return Promise.resolve(data)
      })
  }
}

export default Auth
