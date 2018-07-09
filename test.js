const imageDownloader = require('./src/image-downloader.js')

imageDownloader({
  imgs: [
    {
      uri: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      filename: 'my-image-file-name'
    },
    {
      uri: 'https://s.cdpn.io/3/kiwi.svg' // in this case filename will be kiwi.svg
    }
  ],
  dest: './downloads', //destination folder
})
  .then((info) => {
    console.log('all done', info)
  })
  .catch((error, response, body) => {
    console.log('something goes bad!')
    console.log(error)
  })
