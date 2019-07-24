const request = require('request')
const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

class PromisseHandle {
  constructor({ uri, dest, filename, fileExtension }) {
    this.promise = {
      resolve: null,
      reject: null,
    }
    this.downloadParams = {
      uri,
      dest,
      filename,
      fileExtension,
    }

    this.fileInfo = {
      path: null,
      savedAt: null,
      size: null,
    }

    this.RejectOrResolve = this._RejectOrResolve.bind(this)
    this.requestCallback = this._requestCallback.bind(this)
    this.writeFileCallback = this._writeFileCallback.bind(this)
  }

  _writeFileCallback(err) {
    const { reject, resolve } = this.promise
    if (err) {
      reject(err)
      return
    }
    this.fileInfo.savedAt = Date.now()
    resolve(this.fileInfo)
  }

  _requestCallback(error, response, body) {
    const { reject } = this.promise
    const { dest, filename, fileExtension } = this.downloadParams

    if (error) {
      reject(error, response, body)
      return
    }

    if (body) {
      const { headers, statusCode, request } = response
      const { href } = request.uri

      const removeParamsReg = /\?(?=[^?]*$).+|\/|\./g
      const clearExtReg = /\.(?=[^.]*$).+|\//g
      const clearUrlToFileNameReg = /\/(?=[^/]*$).+/g
      const findFileExtReg = /\.(?=[^.\/\-]*$).+/g

      const findExt = href.match(findFileExtReg)
      const findFileNameInUrl = href.match(clearUrlToFileNameReg)
      const filenameFinal =
        typeof filename === 'string'
          ? filename
          : findFileNameInUrl && findFileNameInUrl[0]
            ? findFileNameInUrl[0].replace(clearExtReg, '')
            : Date.now()

      const finalExt =
        findExt && findExt[0]
          ? findExt[0].replace(removeParamsReg, '')
          : mime.extension(headers['content-type'])

      const finalPath = path.join(dest, filenameFinal + `.${finalExt}`)

      this.fileInfo.path = finalPath
      this.fileInfo.size = `${body.length / 1000}kb`

      fs.writeFile(this.fileInfo.path, body, 'binary', this.writeFileCallback)
    }
  }

  _RejectOrResolve(resolve, reject) {
    const { uri } = this.downloadParams
    this.promise.resolve = resolve
    this.promise.reject = reject

    request(uri, { encoding: 'binary' }, this.requestCallback)
  }
}

function ImageDownloader({ imgs, dest }) {
  if (imgs && dest) {
    if (typeof imgs === 'object' && imgs.length) {
      let Allpromises = []

      for (var i = 0; i < imgs.length; i++) {
        const { uri, filename } = imgs[i]
        const handdle = new PromisseHandle({ uri, filename, dest })
        Allpromises.push(new Promise(handdle.RejectOrResolve))
      }

      return Promise.all(Allpromises)
    }
  } else {
    throw new TypeError('imgs and dest params is required')
  }
}

module.exports = ImageDownloader
