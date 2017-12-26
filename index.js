
const fakeimg = {
  sanitizeMandatory(provider, options) {
    const keys = Object.keys(options)
    return provider.contract.mandatory.filter(mandatory_field =>
      !~keys.indexOf(mandatory_field)
    )
  },

  sanitize(provider, options) {
    const required_fields = fakeimg.sanitizeMandatory(provider, options)
    if(required_fields.length > 0)
      throw fakeimg.error.MANDATORY(required_fields)

    const validation = fakeimg.sanitizeValidate(provider, options)
    if(validation.errors.length > 0)
      throw fakeimg.error.VALIDATION(validation.errors)

    return provider(options, validation.valids)
  },

  sanitizeValidate(provider, options) {
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
  },

  sanitWrapper(provider) {
    return options => fakeimg.sanitize(provider, options)
  },

  use: name => {
    return fakeimg.sanitWrapper(require(`./providers/${name}.js`))
  },

  error: require('./errors/')
}

module.exports = Object.create(fakeimg)
