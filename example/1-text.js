
const fakeImgGenerator = require(__dirname + '/../')
    , fakeimg = fakeImgGenerator.use('fakeimg.pl')


try {
  const generated_img = fakeimg({
    size: '300x200',
    text: 'Dummy text'
  })

  console.log(generated_img)

  console.log('Downloading...')
  generated_img.download().then(response => {
    console.log('Downloaded')
    console.log('Status code', response.statusCode)
  })
} catch(error) {
  console.log(error)
}