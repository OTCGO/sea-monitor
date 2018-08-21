
const request = require('request')

exports.OtcHeight = function () {
  return new Promise((resolve, reject) => {
    var options = { method: 'GET',
      url: 'https://otcgo.cn/api/v1/block/count/',
      headers:
      { 'Content-Type': 'application/json' },
      json: true }

    request(options, function (error, response, body) {
      if (error) return reject(error)

      return resolve(body.height)
    })
  })
}

exports.ApiHeight = function () {
  return new Promise((resolve, reject) => {
    var options = { method: 'GET',
      url: 'https://api.otcgo.cn/mainnet/height',
      headers:
        { 'Content-Type': 'application/json' },
      json: true }

    request(options, function (error, response, body) {
      if (error) return reject(error)

      return resolve(body.height)
    })
  })
}
