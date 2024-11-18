const { convertIntoCurrencyLook } = require('../utils/convertIntoCurrencyLook')
const { calculation_details_keyboard } = require('../keyboard/inlineKeyboard')

/**
 * @typedef {Object} CalculationParams
 * @property {number} autoCost - Вартість автомобіля.
 * @property {number} from - Початкове місце.
 * @property {number} to - Кінцеве місце.
 * @property {number} deliveryCost - Вартість доставки.
 * @property {number} from2 - Додаткове початкове місце.
 * @property {number} deliveryCost2 - Додаткова вартість доставки.
 * @property {number} brokerCost - Вартість брокера.
 * @property {number} customDuty - Мито.
 * @property {number} disposalFee - Плата за утилізацію.
 */


/**
 * Get markdown for Calculation details
 * @param {CalculationParams} params
 *
 * @return {string}
 */
const getMarkdownForDetailCalculation = ({
  autoCost,
  from,
  to,
  deliveryCost,
  from2,
  deliveryCost2,
  brokerCost,
  customDuty,
  disposalFee
}) => {
  const markdown = `
Вартість автомобіля в Китаї:
${autoCost}

Вартість доставки автомобіля із ${from} до ${to}: ${deliveryCost}

Вартість оформлення експортних документів і доставки із  ${from2} до Києва ${deliveryCost2}

Брокерські витрати, СВХ, СБКТС: ${brokerCost}

Таможне мито: ${customDuty}

Утилізаційний збір: ${disposalFee}
  `

  return markdown
}

/**
 * Send detalisation of calculation of auto cost
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 *
 * @return {Promise<void>}
 */
const detailCalculation = async (bot, chatId) => {
  // TODO: get this data from site
  const autoCost = convertIntoCurrencyLook(45646)
  //first path
  const from = `Beijing`
  const to = `Україна`
  const deliveryCost = convertIntoCurrencyLook(78333)
  // second path
  const from2 = to
  const deliveryCost2 = convertIntoCurrencyLook(85145)
  // others
  const brokerCost = convertIntoCurrencyLook(563)
  const customDuty = convertIntoCurrencyLook(5644544)
  const disposalFee = convertIntoCurrencyLook(544)

  const markdown = getMarkdownForDetailCalculation({
    autoCost, from, to, deliveryCost, from2, deliveryCost2, brokerCost, customDuty, disposalFee
  })

  await bot.sendMessage(chatId, markdown, {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
      inline_keyboard: calculation_details_keyboard
    })
  })
}

module.exports = {
  detailCalculation
}