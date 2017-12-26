
const fakeImgGenerator = require(__dirname + '/../')
    , fakeimg = fakeImgGenerator.use('fakeimg.pl')


try {
  const generated_img = fakeimg({
    size: '300',
    text: 's',
    foreground: 'fff,222'
  })
  console.log(
    generated_img
  )
} catch(error) {
  console.log(error)
}
