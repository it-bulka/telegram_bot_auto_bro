const { SITE_URL} = require('./consts/consts')
/**
 * Set start info about services
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 * @param {string} username
 *
 * @return {Promise<void>}
 */
const setStartInfo = async (bot, chatId, username) => {
  const markUp = `
Доброго дня, ${username}.
Я бот для розрахунку вартості авто до Києва!

Просто відправте мені ссилку на авто, з сайту 🔗${SITE_URL}, і я розрахую вам кнцеву вартість автомобіля з врахуванням абсолютно усіх витрат до Києва.✅

Калькулятор для розрахунку кінцевої вартості автомобіля вручну, ви можете знайти в меню↙️.
`

  await bot.sendMessage(chatId, markUp, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  })
}

module.exports = {
  setStartInfo
}