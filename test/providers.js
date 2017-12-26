
const fs = require('fs')
    , should = require('should')
    , fakeimg = require('../')
    , url = require('url')

describe('providers modules', () => {
  fs.readdirSync('src/providers').forEach(provider => {
    const provider_name = provider.replace(/\.js$/, '')
        , provider_instance = fakeimg.use(provider_name)
        , provider_module = require('../src/providers/' + provider)

    describe(provider, () => {
      it('should be a function', () => {
        provider_module.should.be.a.Function()
      })

      it('should have property "url_pattern" as string', () => {
        provider_module.url_pattern.should.be.a.String()
      })

      it('should not throw: new url.URL(url_pattern)', () => {
        should.doesNotThrow(() => {
          new url.URL(provider_module.url_pattern)
        })
      })

      it('should have property "contract" as object', () => {
        provider_module.contract.should.be.an.Object()
      })

      it('should have property "contract.mandatory" as array of strings', () => {
        provider_module.contract.mandatory.should.be.an.Array()
        provider_module.contract.mandatory.should.matchEach(field => {
          field.should.be.a.String()
        })
      })

      it('should have property "contract.validate" as object of functions', () => {
        provider_module.contract.validate.should.be.an.Object()
        provider_module.contract.validate.should.matchEach(field => {
          field.should.be.a.Function()
        })
      })

      it('should have "contract.mandatory" items be keys in "contract.validate"', () => {
        provider_module.contract.mandatory.forEach(field => {
          provider_module.contract.validate.should.have.property(field)
        })
      })

      describe('"contract.validate" keys need to be {items} in "url_pattern"', () => {
        Object.keys(provider_module.contract.validate).forEach(key => {
          it('should check for item {' + key + '}', () => {
            provider_module.url_pattern.should.match(new RegExp('\\{' + key + '\\}'))
          })
        })
      })
    })
  })
})
