
require('should');

var fs = require('fs');
var assert = require('assert');

fs.readdirSync(__dirname + '/../src/providers/').forEach(function(provider) {
  var imgProvider = require(__dirname + '/../src/providers/' + provider);
  var instance;

  describe(provider + ' tests', function() {
    it('should check for a "class"', function() {
      imgProvider.should.be.a.Function();
    });
    
    it('should check for "domain" static property', function() {
      imgProvider.should.have.property('domain');
    });
    
    it('should check for "protocol" static property', function() {
      imgProvider.should.have.property('protocol');
    });
    
    it('should check for "urlProperties" static property', function() {
      imgProvider.should.have.property('urlProperties');
    });
    
    it('should check for "queryStringProperties" static property', function() {
      imgProvider.should.have.property('queryStringProperties');
    });
    
    it('should check for "properties" static property', function() {
      imgProvider.should.have.property('properties');
    });
    
    it('should check for "defaults" static property', function() {
      imgProvider.should.have.property('defaults');
    });
    
    it('should instantiate a new ' + provider, function() {
      assert.doesNotThrow(function() {
        instance = new imgProvider;
      });
    });
    
    it('should generate a URL', function() {
      assert.doesNotThrow(function() {
        /^https?:\/\/(?:\/+)\/.+$/.test(instance.generate());
      });
    });
    
    it('should allow chaining when setting 1 property', function() {
      assert.deepEqual(
        instance.setProperty({}),
        instance
      );
    });
    
    it('should allow chaining when setting many properties', function() {
      assert.deepEqual(
        instance.setProperties({}),
        instance
      );
    });
    
    it('should allow chaining when cleaning properties', function() {
      assert.deepEqual(
        instance.clearProperties(),
        instance
      );
    });
    
    it('should check for properties', function() {
      instance.hasProperty().should.be.a.Boolean();
    });
    
    it('should check for property getting', function() {
      instance.getProperty('width').should.be.a.Number();
    });
  });
});
