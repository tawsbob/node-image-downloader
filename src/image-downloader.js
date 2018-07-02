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
    const { resolve, reject } = this.promise
    const { dest, filename, fileExtension } = this.downloadParams
    const { headers, statusCode, request } = response
    const { href } = request.uri

    if (error) {
      reject(error, response, body)
      return
    }

    const removeParamsReg = /\?(?=[^?]*$).+|\/|\./g
    const clearExtReg = /\.(?=[^.]*$).+|\//g
    const clearUrlToFileNameReg = /\/(?=[^/]*$).+/g
    const findFileExtReg = /\.(?=[^.]*$).+/g

    const findExt = href.match(findFileExtReg)
    const findFileNameInUrl = href.match(clearUrlToFileNameReg)
    const filenameFinal = (findFileNameInUrl && findFileNameInUrl[0]) ? findFileNameInUrl[0].replace(clearExtReg,'') : null
    const finalExt = (findExt && findExt[0]) ? findExt[0].replace(removeParamsReg,'') : mime.extension(headers['content-type'])

    const finalPath = path.join(dest, filenameFinal + `.${finalExt}`)

    this.fileInfo.path = path.join(dest, filenameFinal+ `.${finalExt}`)
    this.fileInfo.size = `${body.length / 1000}kb`

    fs.writeFile(this.fileInfo.path, body, 'binary', this.writeFileCallback)
  }

  _RejectOrResolve(resolve, reject) {
    const { uri } = this.downloadParams
    this.promise.resolve = resolve
    this.promise.reject = reject


    request(uri, { encoding: 'binary' }, this.requestCallback)

  }
}


function ImageDownloader({ uri, dest, filename, fileExtension }) {
  if (uri && dest) {
    if (typeof uri === 'object') {

      let Allpromises = []

      for (var i = 0; i < uri.length; i++) {
        const handdle = new PromisseHandle({ uri: uri[i], dest })
        Allpromises.push(new Promise(handdle.RejectOrResolve))
      }

      return Promise.all(Allpromises)

    } else {
      const handdle = new PromisseHandle({ uri, dest, filename, fileExtension })
      return new Promise(handdle.RejectOrResolve)
    }

  } else {
    throw new TypeError('uri and dest params is required')
  }
}

module.exports = ImageDownloader
