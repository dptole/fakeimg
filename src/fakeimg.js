
const fakeimg = {
  use: name => {
    const provider_module = require(`./providers/${name}.js`)
    return options => require('./features.js')(require('./sanitize.js')(provider_module)(options))
  }
}

module.exports = Object.create(fakeimg)
