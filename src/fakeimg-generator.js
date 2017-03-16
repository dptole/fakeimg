
const fakeImgError = require('./fakeimg-error.js')

class FakeImgGenerator {
  static get providers() { return ['fakeimg.pl'] }
  static get default_provider() { return FakeImgGenerator.providers[0] }
  
  constructor(...params) {
    if(~FakeImgGenerator.providers.indexOf(params[0]))
      return new (require(`./providers/${params.shift()}.js`))(...params)
    throw new fakeImgError(1)
  }
}

module.exports = FakeImgGenerator
