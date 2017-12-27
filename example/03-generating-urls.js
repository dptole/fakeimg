
const fakeimg = require(__dirname + '/../')
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

console.log('Downloading fakeimg...')
fakeimg_pl_object.download().then(http_response =>
  console.log('Fakeimg.pl download: Response status code ' + http_response.statusCode)
)

console.log('Downloading fakeimg to file...')
fakeimg_pl_object.downloadToFile('./fakeimg.pl.png').then(writestream =>
  console.log('Fakeimg.pl download: Writestream path', writestream.path)
)

const dummyimage_object = dummyimage({
  size: 300,
  text: 'Dummy image'
})

// https://dummyimage.com/300x300/cccccc/000000/?text=Dummy+image
console.log(dummyimage_object.toString())

console.log('Downloading dummyimage...')
dummyimage_object.download().then(http_response =>
  console.log('Dummyimage download: Response status code ' + http_response.statusCode)
)

console.log('Downloading dummyimage to file...')
dummyimage_object.downloadToFile('./dummyimage.png').then(writestream =>
  console.log('Dummyimage download: Writestream path', writestream.path)
)
