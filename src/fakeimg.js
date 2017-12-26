
const fakeimg = {
  use: name => options =>
    require('./features.js')(require('./sanitize.js')(require(`./providers/${name}.js`))(options))
}

module.exports = Object.create(fakeimg)
