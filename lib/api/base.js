export default class BaseApi {
  constructor (httpClient, modules) {
    this.modules = {}
    this.setHttpClient(httpClient)
    this.setModules(modules)

    return new Proxy(this, {
      set: (target, prop, value) => {
        if (target.modules[prop]) {
          target.modules[prop] = value
        } else {
          target[prop] = value
        }
      },
      get: (target, prop) => {
        if (target.modules[prop]) {
          return target.modules[prop]
        }

        return target[prop]
      }
    })
  }

  setModule (namespace, module) {
    module.init(this.client)

    this.modules[namespace] = module
  }

  removeModule (namespace) {
    delete this.modules[namespace]
  }

  setHttpClient (httpClient) {
    this.client = httpClient
  }

  setModules (modules) {
    Object.keys(modules).forEach((key) => {
      this.setModule(key, modules[key])
    })
  }
}
