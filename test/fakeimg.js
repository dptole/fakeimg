
require('should');
var assert = require('assert');

var fakeImg = require(__dirname + '/../src/fakeimg.js');

describe('fakeimg tests', function() {
  it('should check for generator property', function() {
    fakeImg.should.have.property('generator');
  });
  
  it('should throw a TypeError when calling fakeImg.generator() without the "new" keyword', function() {
    assert.throws(fakeImg.generator, TypeError);
  });
});
