const { SITE_URL, SITE_URL_TO_CHECK} = require('../consts/consts')
const { check_url_keyboard } = require('../keyboard/inlineKeyboard')
const { processCost } = require('../costs/processCost')
/**
 * @param {string} correctUrl
 * @return {string}
 */
const getMarkdownForCorrectUrl = (correctUrl) => {
  const markdown = `
Невірна ссилка.

Будь ласка, перевірте, що ссилка на авто із сайту 🔗${correctUrl}.
  `

  return markdown
}
/**
 * Send Msg that url is not correct
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 * @param {string} userLink
 *
 * @return {Promise<void>}
 */
const checkCorrectUrl = async (bot, chatId, userLink) => {
  const isCorrectLink = userLink?.includes(SITE_URL_TO_CHECK)

  if (isCorrectLink) {
    await processCost(bot, chatId)
  } else {
    const markdown = getMarkdownForCorrectUrl(SITE_URL)
    await bot.sendMessage(chatId, markdown, {
      reply_markup: JSON.stringify({
        inline_keyboard: check_url_keyboard
      })
    })
  }
}

module.exports = {
  checkCorrectUrl
}