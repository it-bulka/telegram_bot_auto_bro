const {
  COMMAND_AUTO_AGE_LESS_3,
  COMMAND_AUTO_AGE_3_5,
  COMMAND_AUTO_AGE_MORE_5,
  autoAgeText
} = require('../../consts/commands')
const { get_auto_age_keyboard} = require('../../keyboard/inlineKeyboard')

// Currency (step 1)
const getCost = async (bot, chatId) => {
  const markdown = `
Тип валюти: KRW(Вона)

Будь ласка, введыть вартість автомобіля в валюті.  
  `

  const msgId = await bot.sendMessage(chatId, markdown, { parse_mode: 'Markdown' })

  return msgId
}

// AUTO AGE (step 2)
const getAutoAge = async (bot, chatId) => {
  const msgId = await bot.sendMessage(
    chatId,
    'Будь ласка, виберіть вік автомобіля:',
    {
      reply_markup: JSON.stringify({
        inline_keyboard: get_auto_age_keyboard
      })
    })
  return msgId
}

// Engine (step 3)
const getEngine = async (bot, chatId) => {
  const markdown = `
Вкажіть об\'єм двигуна автомобыля в кубічних сантиметрах.  

Наприклад: 1995
  `
  const msgId =  await bot.sendMessage(
    chatId,
    markdown,
    {  parse_mode: 'Markdown'})

  return msgId
}

module.exports = {
  getCost,
  getAutoAge,
  getEngine,
}