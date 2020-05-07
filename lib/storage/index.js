import LocalStorage from './LocalStorage'
import SessionStorage from './SessionStorage'

export default class Storage {
  constructor (options = {}) {
    const defaults = { storage: 'local', namespace: '' }

    this.allowedStores = {
      local: LocalStorage,
      session: SessionStorage
    }

    this.options = { ...defaults, ...options }

    const defaultStorage = this.options.storage
    this.setStorage(defaultStorage)

    return this._instance()
  }

  _instance () {
    return new Proxy(this, {
      set (target, prop, value) {
        if (prop in target.storage) {
          target.storage[prop] = value
        }

        if (prop in target) {
          return target[prop] = value
        }
      },
      get (target, prop) {
        if (prop in target) {
          return target[prop]
        }

        if (prop in target.storage) {
          return target.storage[prop]
        }
      }
    })
  }

  setStorage (type) {
    if (!Object.keys(this.allowedStores).includes(type)) {
      throw new Error(`Storage of type ${type} is not allowed, allowed stores are ${this.allowedStores}`)
    }

    this.storage = new this.allowedStores[type](this.options)

    return this._instance()
  }
}
