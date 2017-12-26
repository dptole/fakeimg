
const errors = require('./errors/')

function sanitize(provider) {
  return options => sanitize.wrapper(provider, options)
}

sanitize.wrapper = (provider, options) => {
  const required_fields = sanitize.sanitizeMandatory(provider, options)
  if(required_fields.length > 0)
    throw errors.MANDATORY(required_fields)

  const validation = sanitize.sanitizeValidate(provider, options)
  if(validation.errors.length > 0)
    throw errors.VALIDATION(validation.errors)

  return provider(options, validation.valids)
}


sanitize.sanitizeMandatory = (provider, options) => {
  const keys = Object.keys(options)
  return provider.contract.mandatory.filter(mandatory_field =>
    !~keys.indexOf(mandatory_field)
  )
}

sanitize.sanitizeValidate = (provider, options) => {
  const errors = []
      , valids = {}

  Object.keys(provider.contract.validate).forEach(field => {
    try {
      valids[field] = provider.contract.validate[field](
        options[field],
        field in options,
        options,
        valids
      )
    } catch(error) {
      errors.push({
        field: field,
        value: options[field],
        error
      })
    }
  })

  return {
    errors,
    valids
  }
}

module.exports = sanitize
