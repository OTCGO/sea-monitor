
const request = require('request')

exports.OtcHeight = function () {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: 'http://otcgo.cn:10332',
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

exports.ApiHeight = function () {
  return new Promise((resolve, reject) => {
    const options = { method: 'POST',
      url: 'http://api.otcgo.cn:10332',
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
