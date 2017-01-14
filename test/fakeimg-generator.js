
require('should');
var assert = require('assert');

var fakeImgGenerator = require(__dirname + '/../src/fakeimg.js').generator;
var fakeImgError = require(__dirname + '/../src/fakeimg-error.js');

describe('fakeimg-generator tests', function() {
  it('should check for providers property', function() {
    fakeImgGenerator.should.have.property('providers');
  });
  
  it('should check for providers property as array', function() {
    fakeImgGenerator.providers.should.be.an.Array();
  });
  
  it('should check for providers property as array of strings', function() {
    assert.doesNotThrow(
      function() {
        fakeImgGenerator.providers.forEach(function(provider) {
          provider.should.be.a.String();
        });
      }
    );
  });
  
  it('should check for providers files', function() {
    assert.doesNotThrow(function() {
      fakeImgGenerator.providers.forEach(function(provider) {
        require(__dirname + '/../src/providers/' + provider + '.js');
      });
    });
  });
  
  it('should check for default_provider property', function() {
    fakeImgGenerator.should.have.property('default_provider');
  });
  
  it('should check for default_provider property as string', function() {
    fakeImgGenerator.default_provider.should.be.a.String();
  });
  
  it('should check for default_provider property inside the providers property', function() {
    fakeImgGenerator.providers.should.containEql(fakeImgGenerator.default_provider);
  });
  
  it('should throw a fakeImgError', function() {
    assert.throws(
      function() {
        new fakeImgGenerator();
      },
      fakeImgError
    );
  });
  
  it('should return an instance other than fakeImgGenerator', function() {
    (new fakeImgGenerator(fakeImgGenerator.default_provider)).should.not.be.an.instanceof(fakeImgGenerator);
  });
});
