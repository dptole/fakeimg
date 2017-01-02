
const fakeImgError = require('./fakeimg-error.js')

class FakeImgGenerator {
  static get providers() { return ['fakeimg.pl'] }
  static get default_provider() { return FakeImgGenerator.providers[0] }
  
  static generate(provider, ...params) {
    if(!~FakeImgGenerator.providers.indexOf(provider))
      throw new fakeImgError(1)
    
    return new (require(`./providers/${provider}.js`))(...params)
  }
  
  constructor(...params) {
    if(!~FakeImgGenerator.providers.indexOf(params[0]))
      throw new fakeImgError(1)
    return FakeImgGenerator.generate(params.shift(), ...params)
  }
}

module.exports = FakeImgGenerator
