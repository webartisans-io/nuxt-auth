import { ValidationError } from './errors'
const hasErrors = (error) => {
  let exception = error
  if (error.isAxiosError) {
    error = error.response
    switch (error.status) {
      case '422':
        exception = new ValidationError(error.data.message)
        exception.setErrors(error.data.errors)
        break
      case '401':
        exception = new ValidationError(error.data.message)
        exception.setErrors(error.data.errors)
        break
      default:
        exception = error
        break
    }
  }
  return Promise.reject(exception)
}

export default hasErrors
