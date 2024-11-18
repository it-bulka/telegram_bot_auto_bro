const {
  COMMAND_START,
  COMMAND_CBR,
  COMMAND_CURRENCY_RATES,
  COMMAND_SETTING_SERVICE,
  COMMAND_MANUAL_MODE
} = require('./consts/commands')

/**
 * Set menu of existed commands
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @return {Promise<void>}
 */
const setMenuCommands = async (bot) => {
  // TODO: what actions should be on that commands: COMMAND_CBR, COMMAND_CURRENCY_RATES, COMMAND_SETTING_SERVICE ?

  await bot.setMyCommands([], { scope: {type: "all_group_chats"}})
  await bot.setMyCommands([
    { command: COMMAND_MANUAL_MODE, description: 'Розрахунок вручну' },
    { command: COMMAND_START, description: 'Старт' },
    { command: COMMAND_CBR, description: 'Курс ЦБ' },
    { command: COMMAND_CURRENCY_RATES, description: 'Актуальний курс оплати' },
    { command: COMMAND_SETTING_SERVICE, description: 'Сервіс' }
  ])
}

module.exports = {
  setMenuCommands
}

