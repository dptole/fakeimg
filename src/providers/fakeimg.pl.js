
class FakeImg {
  static get domain() { return 'fakeimg.pl' }
  static get protocol() { return 'https' }
  
  static get defaults() {
    return {
      width: 300,
      height: 250,
      background: 'cccccc',
      foreground: '909090'
    }
  }

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
    this.clearProperties();
    this.setProperties(properties)
  }
  
  setProperties(properties) {
    Object.keys(properties).forEach(
      property => this.setProperty(property, properties[property])
    )
    return this
  }
  
  getProperties(property) {
    return this.properties
  }
  
  clearProperties() {
    this.properties = {
      width: FakeImg.defaults.width,
      height: FakeImg.defaults.height,
      background: FakeImg.defaults.background,
      foreground: FakeImg.defaults.foreground
    }
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
      this.getProperty('width') ?
        this.getProperty('width')
          + (this.hasProperty('height') ? 'x' + this.getProperty('height') : '')
        : FakeImg.defaults.width + 'x' + FakeImg.defaults.height,
      
      this.getProperty('background') ?
        this.getProperty('background')
          + (this.hasProperty('background_alpha') ? ',' + this.getProperty('background_alpha') : '')
        : FakeImg.defaults.background,
      
      this.getProperty('foreground') ?
        this.getProperty('foreground')
          + (this.hasProperty('foreground_alpha') ? ',' + this.getProperty('foreground_alpha') : '')
        : FakeImg.defaults.foreground
    ].map(
      encodeURIComponent
    ).filter(
      id => id
    ).join('/') + '/'
  }
  
  getQueryStringProperties() {
    return FakeImg.queryStringProperties.map(
      qs => this.hasProperty(qs) &&
        qs + (qs !== 'retina' ? '=' + encodeURIComponent(this.getProperty(qs)) : '')
    ).filter(
      id => id
    ).reduce(
      (acc, qs, _, array) => acc.concat(qs && acc.length === 0 ? (array.length > 0 ? '?' : '') + qs : qs),
      []
    ).filter(
      id => id
    ).join('&')
  }
}

module.exports = FakeImg
