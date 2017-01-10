
class FakeImg {
  static get domain() { return 'fakeimg.pl' }
  static get protocol() { return 'https' }
  
  static get urlProperties() {
    return [
      'width', 'height', 'background', 'background_alpha', 'foreground', 'foreground_alpha'
    ]
  }
  
  static get queryStringProperties() {
    return [
      'text', 'font_name', 'font_size', 'retina'
    ]
  }
  
  static get properties() {
    return FakeImg.urlProperties.concat(FakeImg.queryStringProperties)
  }
  
  constructor(properties = {}) {
    this.properties = {}
    this.setProperties(properties)
  }
  
  setProperties(properties = {
      width, height, text, fontName, fontSize, retina,
      background, background_alpha, foreground, foreground_alpha
  }) {
    Object.keys(properties).forEach(
      property => this.setProperty(property, properties[property])
    )
    return this
  }
  
  setProperty(property, value) {
    if(~FakeImg.properties.indexOf(property))
      this.properties[property] = value
    return this
  }
  
  getProperty(property) {
    return this.properties[property]
  }
  
  getProperties(property) {
    return this.properties
  }
  
  hasProperty(property) {
    return property in this.properties
  }
  
  generate(properties = {}) {
    return this.setProperties(properties).getFqdn() + this.getUrlProperties() + this.getQueryStringProperties()
  }
  
  getFqdn() {
    return FakeImg.protocol + '://' + FakeImg.domain + '/'
  }
  
  getUrlProperties() {
    return [
      this.getProperty('width') && this.getProperty('width')
        + (this.hasProperty('height') ? 'x' + this.getProperty('height')                     : ''),
      
      this.getProperty('background') && this.getProperty('background')
        + (this.hasProperty('background_alpha') ? ',' + this.getProperty('background_alpha') : ''),
      
      this.getProperty('foreground') && this.getProperty('foreground')
        + (this.hasProperty('foreground_alpha') ? ',' + this.getProperty('foreground_alpha') : '')
    ].map(
      encodeURIComponent
    ).filter(
      id => id
    ).join('/')
  }
  
  getQueryStringProperties() {
    return FakeImg.queryStringProperties.map(
      qs => this.hasProperty(qs) &&
        qs + (qs !== 'retina' ? '=' + encodeURIComponent(this.getProperty(qs)) : '')
    ).reduce(
      (acc, qs) => acc.concat(qs && acc.length === 0 ? ['?', qs] : [qs]),
      []
    ).filter(
      id => id
    ).join('&')
  }
}

module.exports = FakeImg
