
const fs = require('fs')
    , should = require('should')
    , fakeimg = require('../')
    , providers_names = fs.readdirSync('src/providers').map(provider => provider.replace(/\.js$/, ''))

describe('fakeimg generator', () => {
  it('should be an object', () => {
    fakeimg.should.be.an.Object()
  })

  it('should have property "use" as function', () => {
    fakeimg.use.should.be.a.Function()
  })

  describe('generating providers', () => {
    providers_names.forEach(provider_name => {
      it('should not throw when creating provider: ' + provider_name, () => {
        should.doesNotThrow(() => fakeimg.use(provider_name))
      })
    })
  })
})
