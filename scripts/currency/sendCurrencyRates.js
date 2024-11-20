const { convertIntoCurrencyLook } = require("../utils/convertIntoCurrencyLook");
const { currency_rate_keyboard } = require('../keyboard/inlineKeyboard')
const { getOfficialCurrencyRates } = require('./getOfficialCurrencyRates')

const getConvertedRatesText = async () => {
  const rates = await getOfficialCurrencyRates()

  const convertedRatesText = rates.map((item) => {
    const currency = item.code
    const rate = convertIntoCurrencyLook(item.mid)
    return `${currency}  ${rate}`
  })

  return convertedRatesText.join('\n')
}
/**
 * Get markdown for currency rates massage
 * @return {Promise<string>}
 */
const getMarkdownForCurrencyRates = async () => {
  const rates = await getConvertedRatesText()

  const markdown = `
Курс Центрального банку Польщі:  

${rates}
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
  const markdown = await getMarkdownForCurrencyRates()
  await bot.sendMessage(chatId, markdown, {
    reply_markup: JSON.stringify({
      inline_keyboard: currency_rate_keyboard
    })
  })
}

module.exports = {
  sendCurrencyRates
}