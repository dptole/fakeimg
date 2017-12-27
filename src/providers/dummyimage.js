
const util = require('util')
    , url = require('url')

function dummyImage(options, validated) {
  const fields_with_value = []
      , fields_without_value = []

  const fakeimg_url = Object.keys(validated).reduce((acc, field) =>
    acc.replace('{' + field + '}', field === 'retina' && !validated[field].value ? '' : encodeURIComponent(validated[field].value)),
    dummyImage.url_pattern
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

    color.value = color.color
    return color
  }
}

dummyImage.url_pattern = 'https://dummyimage.com/{size}/{background}/{foreground}/?text={text}'

dummyImage.contract = {
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
        color: 'cccccc'
      },
      errors: {
        color: 'Invalid background color'
      }
    }),
    foreground: colorContract({
      default: {
        color: '000000'
      },
      errors: {
        color: 'Invalid foreground color'
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
    }
  }
}

module.exports = dummyImage
