
require('should');
var assert = require('assert');

var fakeimgerror = require(__dirname + '/../src/fakeimg-error.js');

describe('fakeimgerror tests', function() {
  it('should throw a new fakeimg-error when instantiated', function() {
    assert.throws(function() {
      new fakeimgerror;
    });
  });
});
