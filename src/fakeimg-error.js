
class FakeImgError {
  constructor(code) {
    this.name = 'FakeImgError'
    this.code = code
    this.message = 'Error code ' + code
  }
}

module.exports = FakeImgError
