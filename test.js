const imageDownloader = require('./src/image-downloader.js')

imageDownloader({
  uri:
    'https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
  dest: './downloads',
  filename: 'download',
  fileExtension: 'jpg',
})
  .then(() => {
    console.log('all done')
  })
  .catch((error, response, body) => {
    console.log('something goes bad!')
    console.log(error)
  })
