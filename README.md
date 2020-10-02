Fake images generator
=====================

  [![Build status][circle-ci-badge]][circle-ci]
  [![Issue status][gh-issues-badge]][gh-issues]
  [![NPM Version][npm-module-version-badge]][npm-module]
  [![Downloads][npm-downloads-total-badge]][npm-module]

When the client waits for the last moment to send the image files, and the layout is broken, you need a fake image to fill the gap.

Image providers
===============

- [DummyImage][dummyimage-url]
- [Fakeimg.pl][fakeimg-pl-url]

Example
=======

```javascript

const fakeimg = require('fakeimg')
    , fakeimg_pl = fakeimg.use('fakeimg.pl')
    , dummyimage = fakeimg.use('dummyimage')

const fakeimg_pl_object = fakeimg_pl({
  size: '400x200',
  background: '909090,255',
  foreground: 'fba,127',
  text: 'Fake image'
})

// https://fakeimg.pl/400x200/909090%2C255/fba%2C127/?text=Fake+image&font_name=yanone&font_size=50
console.log(fakeimg_pl_object.toString())

fakeimg_pl_object.download().then(http_response =>
  console.log('Fakeimg.pl download: Response status code ' + http_response.statusCode)
)

fakeimg_pl_object.downloadToFile('./fakeimg.pl.png').then(writestream =>
  console.log('Fakeimg.pl download: Writestream path', writestream.path)
)

const dummyimage_object = dummyimage({
  size: 300,
  text: 'Dummy image'
})

// https://dummyimage.com/300x300/cccccc/000000/?text=Dummy+image
console.log(dummyimage_object.toString())

dummyimage_object.download().then(http_response =>
  console.log('Dummyimage download: Response status code ' + http_response.statusCode)
)

dummyimage_object.downloadToFile('./dummyimage.png').then(writestream =>
  console.log('Dummyimage download: Writestream path', writestream.path)
)

```

When the client waits for the last moment to send the image files, and the layout is broken, you need a fake image to fill the gap.

Image providers
===============

- [DummyImage][dummyimage-url]
- [Fakeimg.pl][fakeimg-pl-url]

Example
=======

```javascript

const fakeimg = require('fakeimg')
    , fakeimg_pl = fakeimg.use('fakeimg.pl')
    , dummyimage = fakeimg.use('dummyimage')

const fakeimg_pl_object = fakeimg_pl({
  size: '400x200',
  background: '909090,255',
  foreground: 'fba,127',
  text: 'Fake image'
})

// https://fakeimg.pl/400x200/909090%2C255/fba%2C127/?text=Fake+image&font_name=yanone&font_size=50
console.log(fakeimg_pl_object.toString())

fakeimg_pl_object.download().then(http_response =>
  console.log('Fakeimg.pl download: Response status code ' + http_response.statusCode)
)

fakeimg_pl_object.downloadToFile('./fakeimg.pl.png').then(writestream =>
  console.log('Fakeimg.pl download: Writestream path', writestream.path)
)

const dummyimage_object = dummyimage({
  size: 300,
  text: 'Dummy image'
})

// https://dummyimage.com/300x300/cccccc/000000/?text=Dummy+image
console.log(dummyimage_object.toString())

dummyimage_object.download().then(http_response =>
  console.log('Dummyimage download: Response status code ' + http_response.statusCode)
)

dummyimage_object.downloadToFile('./dummyimage.png').then(writestream =>
  console.log('Dummyimage download: Writestream path', writestream.path)
)

```

License
=======

  [MIT][LICENSE]

[dummyimage-url]: https://dummyimage.com/
[fakeimg-pl-url]: https://fakeimg.pl/
[circle-ci]: https://circleci.com/gh/dptole/fakeimg
[circle-ci-badge]: https://img.shields.io/circleci/project/dptole/fakeimg.svg
[gh-issues]: https://github.com/dptole/fakeimg/issues
[gh-issues-badge]: https://img.shields.io/github/issues-raw/dptole/fakeimg.svg
[npm-module]: https://www.npmjs.org/package/fakeimg
[npm-module-version-badge]: https://img.shields.io/npm/v/fakeimg.svg
[npm-downloads-total-badge]: https://img.shields.io/npm/dt/fakeimg.svg
[LICENSE]: LICENSE
