const imageDownloader = require('./src/image-downloader.js')

imageDownloader({
  uri:
    'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  dest: './downloads', //destination folder
  filename: 'download', //name of file
  fileExtension: 'jpg', //extension of file
})
  .then((info) => {
    console.log('all done', info)
  })
  .catch((error, response, body) => {
    console.log('something goes bad!')
    console.log(error)
  })
