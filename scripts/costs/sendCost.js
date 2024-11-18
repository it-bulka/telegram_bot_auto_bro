const { convertIntoCurrencyLook } = require('../utils/convertIntoCurrencyLook')
const { send_costs_keyboard} = require('../keyboard/inlineKeyboard')

/**
 * Get markdown for cost message
 * @param {string} cost
 * @param {string} autoLinkFromUser
 *
 * @return {string}
 */
const getMarkdownForCost = (cost, autoLinkFromUser) => {
  const markdown = `
Вартість автомобіля під ключ в Україні:
__${cost}__
  
🔗[Ссилка на автомобіль](${autoLinkFromUser})
 
Вартість "під ключЄ включає в себе всі розходи до м.Київ, а саме:
оформлення експорта в Китаї, логістику, послуги брокерів, склади тимчасового зберігання, проходження лабораторії для отримання СБКТС і таможне мито.
  
Актуальні курси валют ви можете глянути в Меню.
  
По питанням проведення оплати і замовлення авто ви можете звернутися до нашого менеджера [@iva147iva147](https://t.me/iva147iva147)
  `

  return markdown
}

/**
 * Send cost of auto
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 *
 * @return {Promise<void>}
 */
const sendCost = async (bot, chatId) => {
  const autoLinkFromUser = `https://www.che168.com/`
  // TODO: get cost dynamically from site
  const cost = convertIntoCurrencyLook(125000)
  const markup = getMarkdownForCost(cost, autoLinkFromUser)

  await bot.sendMessage(chatId, markup, {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
      inline_keyboard: send_costs_keyboard,
      remove_keyboard: true
    })
  })
}

module.exports = {
  sendCost
}