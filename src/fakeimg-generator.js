
const fakeImgError = require('./fakeimg-error.js')

class FakeImgGenerator {
  static get providers() { return ['fakeimg.pl'] }
  static get default_provider() { return FakeImgGenerator.providers[0] }
  
  static generate(provider, ...params) {
    return ~FakeImgGenerator.providers.indexOf(provider)
      ? new (require(`./providers/${provider}.js`))(...params)
      : new fakeImgError(1)
  }
  
  constructor(...params) {
    return ~FakeImgGenerator.providers.indexOf(params[0])
      ? FakeImgGenerator.generate(params.shift(), ...params)
      : new fakeImgError(1)
  }
}

module.exports = FakeImgGenerator
