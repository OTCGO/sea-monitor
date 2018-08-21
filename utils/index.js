const API = require('wechat-enterprise-api')
const config = require('config')

const api = new API(config.wechat.corpid, config.wechat.corpsecret, config.wechat.agentid)

exports.sendMsg = function (content) {
  return new Promise((resolve, reject) => {
    const to = {
      'touser': '@all'
    }
    const message = {
      'msgtype': 'text',
      'text': {
        'content': content
      },
      'safe': '0'
    }
    api.send(to, message, function (error, data, res) {
      if (error) return reject(error)

      return resolve()
    })
  })
}
