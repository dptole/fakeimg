
require('should');

var fakeImgProvider = require(__dirname + '/../src/providers/fakeimg.pl.js');

describe('fakeimg.pl tests', function() {
  it('should check for fakeimg.pl as a "class"', function() {
    fakeImgProvider.should.be.a.Function();
  });
  
  it('should check for domain static property', function() {
    fakeImgProvider.should.have.property('domain');
  });
  
  it('should check for protocol static property', function() {
    fakeImgProvider.should.have.property('protocol');
  });
  
  it('should check for urlProperties static property', function() {
    fakeImgProvider.should.have.property('urlProperties');
  });
  
  it('should check for queryStringProperties static property', function() {
    fakeImgProvider.should.have.property('queryStringProperties');
  });
  
  it('should check for properties static property', function() {
    fakeImgProvider.should.have.property('properties');
  });
});
