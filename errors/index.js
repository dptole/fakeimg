
function errors(code, info) {
  const err_object = errors.json[code] || errors.UNKNOWN
      , err = new Error(err_object.description)

  err.code = code
  err.error = err_object.error
  err.info = info

  return err
}

errors.json = require('./errors.json')

errors.UNKNOWN = {
  error: 'UNKNOWN',
  description: 'Unknown error.'
}

Object.keys(errors.json).forEach(code =>
  errors[errors.json[code].error] = info => errors(code, info)
)

module.exports = errors
