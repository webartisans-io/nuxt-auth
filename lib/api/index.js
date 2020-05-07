import BaseApi from './base'
import Auth from './auth'

class Api extends BaseApi {
  constructor (httpClient) {
    super(httpClient, {
      auth: new Auth()
    })
  }
}
export default Api
