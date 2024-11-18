const { convertIntoCurrencyLook } = require("../utils/convertIntoCurrencyLook");
const { currency_rate_keyboard } = require('../keyboard/inlineKeyboard')
/**
 * Get markdown for currency rates massage
 * @return {string}
 */
const getMarkdownForCurrencyRates = () => {
  // TODO: get rates from site
  const UKR = convertIntoCurrencyLook(4454545)
  const KRW = convertIntoCurrencyLook(456422)
  const CNY = convertIntoCurrencyLook(782255)
  const USD = convertIntoCurrencyLook(95335)

  const markdown = `
Актуальний курс оплати:  

UKR = ${UKR}
KRW = ${KRW}
CNY = ${CNY}
USD = ${USD}
  `

  return markdown
}
/**
 * Send currency rates massage
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 *
 * @return {Promise<void>}
 */
const sendCurrencyRates = async (bot, chatId) => {
  const markdown = getMarkdownForCurrencyRates()
  await bot.sendMessage(chatId, markdown, {
    reply_markup: JSON.stringify({
      inline_keyboard: currency_rate_keyboard
    })
  })
}

module.exports = {
  sendCurrencyRates
}