
class FakeImgError {
  constructor(code) {
    this.name = 'FakeImgError'
    this.code = code
    this.message = 'Error code ' + code
    throw this
  }
}

module.exports = FakeImgError
