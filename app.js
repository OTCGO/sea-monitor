const dotenv = require('dotenv').config(); // eslint-disable-line

const schedule = require('node-schedule')
const _ = require('lodash')
const Block = require('./block')
const {
  OtcHeight,
  ApiHeight
} = require('./api')
const {
  sendMsg
} = require('./utils')

async function main () {
  try {
    // getBlockHeight
    const b = new Block()
    const blockHeight = await b.getBlockHeight()

    console.log('blockHeight', blockHeight)

    // api height

    const apiHeight = await ApiHeight()

    console.log('apiHeight', apiHeight)

    const otcHeight = await OtcHeight()

    console.log('otcHeight', otcHeight)

    const max = _.max([blockHeight, apiHeight, otcHeight])

    const min = _.max([blockHeight, apiHeight, otcHeight])
    console.log('max', max)

    console.log('min', min)

    // sendMsg(`
    // 当前区块同步错误，请检查\n
    // blockHeight:${blockHeight}\n
    // otcHeight:${otcHeight}\n
    // apiHeight:${apiHeight}
    // `)
    // abs  > 10 send msg
    if (Math.abs(max - min) > 10) {
      sendMsg(`
      当前区块同步错误，请检查\n
      blockHeight:${blockHeight}\n
      otcHeight:${otcHeight}\n
      apiHeight:${apiHeight}
      `)
    }
  } catch (error) {

  }
}

// main()
schedule.scheduleJob('30 * * * * *', function () {
  console.log('script start')
  main()
})
