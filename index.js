require('dotenv').config()
const express = require('express')
const app = express()

const TelegramBot = require('node-telegram-bot-api')
const { setMenuCommands } = require('./scripts/setMenuCommands')
const { handleMessageEvent } = require('./scripts/handlers/handleMessageEvent')
const { handleCbQueryEvent } = require('./scripts/handlers/handleCbQuery')
const { botRoutes } = require('./scripts/routes/botRoutes')

app.use(express.json());

const initBot = async () => {
  const token = process.env.BOT_TOKEN;
  const bot = new TelegramBot(token);

  // Налаштування вебхука
  await bot.setWebHook(`${process.env.SERVER_URL}/bot`);

  // Створення маршрутів для бота
  botRoutes(app, bot);

  // Налаштування команд бота
  await setMenuCommands(bot);

  return bot;
}

const startServer = () => {
  app.listen(3000, () => {
    console.log('Bot is running on port 3000');
  });
}


/**
 * Start the bot and set its commands.
 * @returns {Promise<void>} A promise that resolves when the bot is started and commands are set.
 */
const start = async () => {
  const bot = await initBot();
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

  startServer();
}

start()
  .catch(err => console.log(err))