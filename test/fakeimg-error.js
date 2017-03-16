
require('should');
var assert = require('assert');

var fakeimgerror = require(__dirname + '/../src/fakeimg-error.js');

describe('fakeimg-error tests', function() {
  it('should carry the error code provided when instantiated', function() {
    var code = Math.random();
    var error = new fakeimgerror(code);
    assert.strictEqual(code, error.code);
  });
});
