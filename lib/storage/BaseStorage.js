export default class BaseStorage {
  constructor (options = {}) {
    const defaults = { namespace: '', storage: 'localStorage' }
    this.options = options ? { ...defaults, ...options } : defaults

    const { namespace, storage } = this.options

    this._storage = storage
    this.namespace = namespace || ''

    if (!this._check()) {
      throw new Error(`${this._storage} is not available`)
    }
  }

  _check () {
    const testKey = '_storage_test_key_'
    try {
      window[this._storage].setItem(testKey, testKey)
      window[this._storage].removeItem(testKey)
      return true
    } catch (e) {
      return false
    }
  }

  get (key) {
    const fullKey = this.namespace ? `${this.namespace}/${key}` : key
    return window[this._storage].getItem(fullKey)
  }

  has (key) {
    const fullKey = this.namespace ? `${this.namespace}/${key}` : key
    return !!window[this._storage].getItem(fullKey)
  }

  set (key, value) {
    const fullKey = this.namespace ? `${this.namespace}/${key}` : key
    window[this._storage].setItem(fullKey, value)
  }

  remove (key) {
    const fullKey = this.namespace ? `${this.namespace}/${key}` : key
    window[this._storage].removeItem(fullKey)
  }

  clear () {
    window[this._storage].clear()
  }
}
