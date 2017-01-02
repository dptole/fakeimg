
const fakeImgGenerator = require(__dirname + '/../src/fakeimg.js').generator
    , fkimg = new fakeImgGenerator('fakeimg.pl', {
        width: 500
      })

// Chaining
fkimg
  .setProperty('text', 'Hey fake img')
  .setProperty('retina', true)
  .setProperty('font_size', 100)
  .setProperty('font_name', 'museo')
  .setProperties({
    background: 'f00',
    foreground: '00ff00',
    foreground_alpha: 128,
    background_alpha: 181
  })

// "Hey fake img"
console.log(fkimg.getProperty('text'))

// { width: 500,
//   text: 'Hey fake img',
//   retina: true,
//   font_size: 100,
//   font_name: 'museo',
//   background: 'f00',
//   foreground: '00ff00',
//   foreground_alpha: 128,
//   background_alpha: 181 }
console.log(fkimg.getProperties())

// "https://fakeimg.pl/500x456/f00%2C181/00ff00%2C128?&text=Hey%20fake%20img&font_name=museo&font_size=100&retina"
console.log(fkimg.generate({height: 456}))
