
const request = require('request')

class Block {
  getBlockHeight () {
    return new Promise((resolve, reject) => {
      const options = { method: 'POST',
        url: 'http://114.215.30.71:10332',
        headers:
        { 'Content-Type': 'application/json' },
        body: { jsonrpc: '2.0', method: 'getblockcount', params: [], id: 1 },
        json: true }

      request(options, function (error, response, body) {
        // console.log('err', error)
        if (error) return reject(error)

        return resolve(body.result)
      })
    })
  }

  getRawmemPool () {
    return new Promise((resolve, reject) => {
      const options = { method: 'POST',
        url: 'http://114.215.30.71:10332',
        headers:
        { 'Content-Type': 'application/json' },
        body: { jsonrpc: '2.0', method: 'getrawmempool', params: [], id: 1 },
        json: true }

      request(options, function (error, response, body) {
        // console.log('err', error)
        if (error) return reject(error)

        return resolve(body.result)
      })
    })
  }
}

module.exports = Block
