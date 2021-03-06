
const util = require('util')
    , url = require('url')

function fakeimgPl(options, validated) {
  const fields_with_value = []
      , fields_without_value = []

  const fakeimg_url = Object.keys(validated).reduce((acc, field) =>
    acc.replace('{' + field + '}', field === 'retina' && !validated[field].value ? '' : encodeURIComponent(validated[field].value)),
    fakeimgPl.url_pattern
  )

  const url_instance = new url.URL(fakeimg_url)
      , url_string = new String(url_instance.origin + url_instance.pathname + '?' + url_instance.searchParams.toString())

  url_string.options = options
  url_string.validated = validated

  return url_string
}

function colorContract(options) {
  return function(value, provided, all_options, valids) {
    let color = options.default

    if(provided) {
      if(!/^([0-9a-f]{3}|[0-9a-f]{6})(?:,(\d{1,3}))?$/i.test(value))
        throw new Error(options.errors.color)

      if(RegExp.$2 < 1 || RegExp.$2 > 255)
        throw new Error(options.errors.alpha)

      color = {
        color: RegExp.$1,
        alpha: RegExp.$2,
      }
    }

    color.value = color.color + ',' + color.alpha
    return color
  }
}

fakeimgPl.url_pattern = 'https://fakeimg.pl/{size}/{background}/{foreground}/?text={text}&font_name={font_name}&font_size={font_size}&{retina}'

fakeimgPl.contract = {
  mandatory: ['size'],
  validate: {
    size(value, provided, all_options, valids) {
      if(/^([1-9]\d*)(?:x([1-9]\d*))?$/.test(value) && Math.max(RegExp.$1, RegExp.$2 || 0) <= 4000)
        return {
          width: RegExp.$1,
          height: RegExp.$2 || RegExp.$1,
          value: RegExp.$1 + 'x' + (RegExp.$2 || RegExp.$1)
        }
      throw new Error('Invalid size')
    },
    background: colorContract({
      default: {
        color: 'cccccc',
        alpha: 255
      },
      errors: {
        color: 'Invalid background color',
        alpha: 'Invalid background alpha'
      }
    }),
    foreground: colorContract({
      default: {
        color: '909090',
        alpha: 255
      },
      errors: {
        color: 'Invalid foreground color',
        alpha: 'Invalid foreground alpha'
      }
    }),
    text(value, provided, all_options, valids) {
      if(!provided)
        return {value: valids.size.width + 'x' + valids.size.height}

      if(!util.isString(value))
        throw new Error('Invalid text')

      value = value.trim()
      return {
        value: value.length < 1
          ? valids.size.width + 'x' + valids.size.height
          : value
      }
    },
    font_name(value, provided, all_options, valids) {
      if(!provided)
        return {value: 'yanone'}

      if(!util.isString(value))
        throw new Error('Invalid font')

      return {
        value: ~['bebas', 'lobster', 'museo', 'yanone'].indexOf(value)
          ? value
          : 'yanone'
      }
    },
    font_size(value, provided, all_options, valids) {
      let font_size = Math.min(valids.size.width, valids.size.height) / 4

      if(provided) {
        if(!(Number.isInteger(value) && value > 0))
          throw new Error('Invalid font size')
        font_size = value
      }

      return {value: font_size}
    },
    retina(value, provided, all_options, valids) {
      return {value: !!value}
    }
  }
}

module.exports = fakeimgPl
