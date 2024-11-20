const {
  COMMAND_START,
  COMMAND_CURRENCY_RATES,
  COMMAND_CBR,
  COMMAND_SETTING_SERVICE,
  COMMAND_MANUAL_MODE
} = require("../consts/commands")
const { setStartInfo } = require("../startInfo")
const { checkCorrectUrl } = require('../parseWebsiteData/checkCorrectUrl')
const { sendCurrencyRates } = require('../currency/sendCurrencyRates')
const { sendConstraints } = require('../constraints/sendConstraints')
const { ManualCalculationChecker } = require('../manualCalculation/handleManualCalculationSteps.js')
const { users } = require('../consts/consts')
const { initManualCalculation } = require('../manualCalculation/initManualCalculation')
const { leftManualMode } = require('../manualCalculation/leftManualMode')

/**
 * @typedef {Object} ChatData
 * @property {string} msgText
 * @property {number} msgId
 * @property {number} chatId
 * @property {userId} chatId
 * @property {string} username
 */

/**
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {ChatData} chatDta
 * @return {Promise<void>}
 */
const handleMessageEvent = async (bot, chatData) => {
  const {msgText, msgId, chatId, username, userId} = chatData
  const manualCalculation = new ManualCalculationChecker(bot)

  const handleDefaultMsgBehaviour = async (bot, chatId, userId, msgId, text) => {
    if (users[userId].manual_mode) {
      await manualCalculation.handleSteps(chatId, userId, msgId, text)
    } else {
      await checkCorrectUrl(bot, chatId, text)
    }
  }

  try {
    switch (msgText) {
      case COMMAND_START:
        leftManualMode(userId)
        await setStartInfo(bot, chatId, username)
        break
      // TODO: distinguish: COMMAND_CURRENCY_RATES = rates from bot owner (no yet); COMMAND_CBR = from bank (already written)
      case COMMAND_CURRENCY_RATES:
      case COMMAND_CBR:
        leftManualMode(userId)
        await sendCurrencyRates(bot, chatId)
        break
      case COMMAND_SETTING_SERVICE:
        leftManualMode(userId)
        await sendConstraints(bot, chatId)
        break
      case COMMAND_MANUAL_MODE:
        await initManualCalculation(bot, chatId, userId)
        break
      default:
       await handleDefaultMsgBehaviour(bot, chatId, userId, msgId, msgText)
        return
    }
  } catch(err) {
    // TODO: do smth with err
    console.log(err)
  }
}

module.exports = {
  handleMessageEvent
}