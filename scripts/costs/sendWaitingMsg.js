const { convertIntoCurrencyLook } = require('../utils/convertIntoCurrencyLook')

/**
 * @typedef {Object} WaitingMsgData
 * @property {number} cost
 * @property {import('../../types.js').AutoAge} age
 * @property {number} engine
 */

/**
 * Get markdown for waitingMsg
 * @param {WaitingMsgData} data
 * @return {string}
 */
const getMarkdownForWaitingMsg = ({ cost, age, engine }) => {
  const convertedCost  = convertIntoCurrencyLook(cost)

  // TODO: check where to get this data? site ? (Вік, Вартість, об'єм двигуна)
  const markdown = `
Данні передані в обробку ⏳
    
Вік: ${age}.
Вартість: ${convertedCost}
Об'єм двигуна: ${engine} cc
  `

  return markdown
}

/**
 * Send message about processing cost info
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 * @param {WaitingMsgData} data
 *
 * @return {Promise<void>}
 */
const sendWaitingMsg = async (bot, chatId, data) => {
  const markup  = getMarkdownForWaitingMsg(data)
  await bot.sendMessage(chatId, markup, {
    parse_mode: 'Markdown'
  })
}

module.exports = {
  sendWaitingMsg
}