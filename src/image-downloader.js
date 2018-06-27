const request = require('request')
const path = require('path')
const fs = require('fs')

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
    
    resolve()
  }
  _requestCallback(error, response, body) {
    const { resolve, reject } = this.promise
    const { dest, filename, fileExtension } = this.downloadParams

    if (error) {
      reject(error, response, body)
      return
    }

    const destination = path.join(dest, filename) + `.${fileExtension}`
    fs.writeFile(destination, body, 'binary', this.writeFileCallback)
  }

  _RejectOrResolve(resolve, reject) {
    const { uri } = this.downloadParams
    this.promise.resolve = resolve
    this.promise.reject = reject

    request(uri, { encoding: 'binary' }, this.requestCallback)
  }
}

function ImageDownloader({ uri, dest, filename, fileExtension }) {
  if (uri && dest && filename && fileExtension) {
    const handdle = new PromisseHandle({ uri, dest, filename, fileExtension })

    return new Promise(handdle.RejectOrResolve)
  } else {
    throw new TypeError('uri, dest, filename params is required')
  }
}

module.exports = ImageDownloader
