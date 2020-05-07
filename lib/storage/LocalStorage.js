import BaseStorage from './BaseStorage'

export default class LocalStorage {
  constructor (options = {}) {
    const defaults = {}
    return new BaseStorage({ ...defaults, ...options, ...{ storage: 'localStorage' } })
  }
}
