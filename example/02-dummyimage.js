
const fakeImgGenerator = require(__dirname + '/../')
    , dummyimage = fakeImgGenerator.use('dummyimage')
    , path = require('path')

try {
  const generated_img = dummyimage({
    size: '300x200',
    text: 'Dummy text'
  })

  console.log(generated_img)

  console.log('Downloading...')
  generated_img.download().then(response => {
    console.log('Downloaded')
    console.log('Status code', response.statusCode)
    console.log('Response headers', response.headers)
    
    const filepath = path.join(__dirname, 'dummyimage.download.png')
    console.log('Downloading to file ' + filepath + '...')
    return generated_img.downloadToFile(filepath)
  }).then(writestream => {
    console.log('Downloaded')
    console.log('Writestream path', writestream.path)
  })
} catch(error) {
  console.log(error)
}