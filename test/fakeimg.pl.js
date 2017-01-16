
require('should');

var fakeImgProvider = require(__dirname + '/../src/providers/fakeimg.pl.js');

describe('fakeimg.pl tests', function() {
  it('should check for fakeimg.pl as a "class"', function() {
    fakeImgProvider.should.be.a.Function();
  });
  
  it('should check for domain statc property', function() {
    fakeImgProvider.should.have.property('domain');
  });
  
  it('should check for protocol statc property', function() {
    fakeImgProvider.should.have.property('protocol');
  });
  
  it('should check for urlProperties statc property', function() {
    fakeImgProvider.should.have.property('urlProperties');
  });
  
  it('should check for queryStringProperties statc property', function() {
    fakeImgProvider.should.have.property('queryStringProperties');
  });
  
  it('should check for properties statc property', function() {
    fakeImgProvider.should.have.property('properties');
  });
});
