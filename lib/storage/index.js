import LocalStorage from './LocalStorage'
import SessionStorage from './SessionStorage'

export default class Storage {
  constructor (options = {}) {
    const defaults = { storage: 'local', namespace: '' }
    this.storage = null
    this.allowedStores = {
      local: LocalStorage,
      session: SessionStorage
    }

    this.options = { ...defaults, ...options }

    const defaultStorage = this.options.storage
    this.setStorage(defaultStorage)
    
  }
  
  setStorage (type) {
    if (!Object.keys(this.allowedStores).includes(type) && !type) {
      throw new Error(`Storage of type ${type} is not allowed, allowed stores are ${this.allowedStores}`)
    }
    
    this.storage = new this.allowedStores[type](this.options)
    
    
    return this
  }
  
  has (key) {
    return this.storage.has(key)
  }
  
  get (key) {
    return this.storage.get(key)
  }
  
  set (key, value) {
    return this.storage.set(key, value)
  }
  
  remove (key) {
    return this.storage.remove(key)
  }
  
  clear () {
    return this.storage.clear()
  }
}
