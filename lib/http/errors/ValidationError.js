class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = 'ValidationError'
    this.errors = null
  }

  setErrors (errors) {
    this.errors = errors
  }

  getErrors () {
    return this.errors
  }
}

export default ValidationError
