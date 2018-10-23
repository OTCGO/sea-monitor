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

async function heightCheck () {
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

    const min = _.min([blockHeight, apiHeight, otcHeight])
    console.log('max', max)

    console.log('min', min)

    // sendMsg(`
    // 当前区块同步错误，请检查\n
    // blockHeight:${blockHeight}\n
    // otcHeight:${otcHeight}\n
    // apiHeight:${apiHeight}
    // `)
    // abs  > 10 send msg
    if (Math.abs(max - min) > 150) {
      sendMsg(`
      当前区块同步错误，请检查\n
      blockHeight:${blockHeight}\n
      otcHeight:${otcHeight}\n
      apiHeight:${apiHeight}
      `)
    }
  } catch (error) {
    console.log('error', error)
    sendMsg(`
    当前区块同步错误，请检查\n${error}
    `)
  }
}

async function rawmempoolCheck () {
  try {
    // getBlockHeight
    const b = new Block()

    // getrawmempool
    const rawmempool = await b.getRawmemPool()

    console.log('rawmempool', rawmempool.length)
    if (rawmempool.length > 10000) {
      sendMsg(`
      当前未交易数，${rawmempool.length}\n
      可能交易拥堵，请注意
      `)
    }
  } catch (error) {
    console.log('error', error)
    sendMsg(`
    当前未交易数错误，请检查\n${error}
    `)
  }
}

function main () {
  schedule.scheduleJob('30 * * * * *', function () {
    console.log('heightCheck script start', new Date())
    heightCheck()
  })

  schedule.scheduleJob('0 */5 * * * *', function () {
    console.log('rawmempoolCheck script start', new Date())
    rawmempoolCheck()
  })
}

main()
