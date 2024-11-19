const { SITE_URL_TEXT } = require("../consts/consts");

/**
 * @return {string}
 */
const getMarkdownForRequirements = () => {
  const markdown = `
Будь ласка, відправте мені ссилку на автомобіль з сайту 🔗 ${SITE_URL_TEXT}.

Калькулятор для розрахунку кінцевої вартості автомобіля вручну, ви можете знайти в меню  ↙️.
`

  return markdown
}

/**
 * Send requirement for auto calculation
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 * @return {Promise<void>}
 */
const sendRequirementForAutoCalculation = async (bot, chatId) => {
  const markdown = getMarkdownForRequirements()
  await bot.sendMessage(chatId, markdown, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  })
}

module.exports = {
  sendRequirementForAutoCalculation
}