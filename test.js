const imageDownloader = require('./src/image-downloader.js')

imageDownloader({
  uri:
    'https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
  dest: './downloads', //destination folder
  filename: 'download', //name of file
  fileExtension: 'jpg', //extension of file
})
  .then((response) => {
    console.log('all done', response)
  })
  .catch((error, response, body) => {
    console.log('something goes bad!')
    console.log(error)
  })
