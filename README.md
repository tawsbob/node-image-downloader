# node-image-downloader
Simple and lightweight **image downloader** module for nodejs 😉

## Usage

```javascript
const imageDownloader = require('node-image-downloader')

imageDownloader({
  uri:
    'https://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg',
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

```

## Roadmap

- [ ] Validations (file extensions, valid url, etc ...)
- [ ] Download Progress
- [ ] Download Queue for multiples images
- [ ] Tests

## Contacts

[My Linkedin - Dellean Santos](https://www.linkedin.com/in/delleansantos/)

[Github Profile - @tawsbob](https://github.com/tawsbob/gpu-scrapper/blob/ba2aa5403852374be79e0ee878c7384042a130e0/src/utils/imageDownloader.js)

## License

MIT License

Copyright (c) 2018 **Dellean Santos**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

SOFTWARE.
