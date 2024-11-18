const { autoAgeText } = require('../consts/commands')
const { ManualCalculationChecker } = require("./handleManualCalculationSteps");
const { users } = require("../consts/consts");

/**
 * Handler for callback_query for autoAge keyboard
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 * @param {number} userId
 * @param {string} text
 * @return {Promise<void>}
 */
const handleStepAgeKeyboardCb = async (bot, chatId, userId, queryData) => {
  const text = autoAgeText[queryData]
  const manualCalculation = new ManualCalculationChecker(bot)
  if (users[userId].manual_mode) {
    await manualCalculation.handleSteps(chatId, userId, null, text)
  }
}


module.exports = {
  handleStepAgeKeyboardCb
}