require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const { setMenuCommands } = require('./scripts/setMenuCommands')
const { handleMessageEvent } = require('./scripts/handlers/handleMessageEvent')
const { handleCbQueryEvent } = require('./scripts/handlers/handleCbQuery')

const token = process.env.BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })
const { users } = require('./scripts/consts/consts')

/**
 * Start the bot and set its commands.
 * @returns {Promise<void>} A promise that resolves when the bot is started and commands are set.
 */
const start = async () => {
  await setMenuCommands(bot)

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text
    const username = msg.from.first_name
    const userId = msg.from.id
    const msgId = msg.message_id

    await handleMessageEvent(bot, { chatId, msgText: text, username, userId, msgId })
  })

  bot.on('callback_query', async (query) => {
    await handleCbQueryEvent(bot, query)
  })
}

start()
  .catch(err => console.log(err))