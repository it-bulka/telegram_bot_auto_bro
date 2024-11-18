/**
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 *
 * @return {Promise<void>}
 */
const sendConstraints = async (bot, chatId) => {
  await bot.sendMessage(chatId, 'Доступ до функціоналу обмежений')
}

module.exports = {
  sendConstraints
}