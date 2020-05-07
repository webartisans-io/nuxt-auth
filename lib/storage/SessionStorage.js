import BaseStorage from './BaseStorage'

export default class SessionStorage {
  constructor (options = {}) {
    const defaults = {}
    return new BaseStorage({ ...defaults, ...options, ...{ storage: 'sessionStorage' } })
  }
}
