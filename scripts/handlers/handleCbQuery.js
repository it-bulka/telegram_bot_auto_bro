const {
  COMMAND_CALCULATION_DETAILS,
  COMMAND_LEAVE_REQUEST,
  COMMAND_CONTACT_MANAGER,
  COMMAND_OTHER_AUTO,
  COMMAND_MANUAL_MODE,
  // autoage
  COMMAND_AUTO_AGE_LESS_3,
  COMMAND_AUTO_AGE_3_5,
  COMMAND_AUTO_AGE_MORE_5
} = require('../consts/commands')
const { detailCalculation } = require('../costs/detailCalculation')
const { sendRequirementForAutoCalculation } = require('../costs/sendRequirementForAutoCalculation')
const { handleStepAgeKeyboardCb } = require('../manualCalculation/handleStepAgeKeyboardCb')

/**
 * Handle callback_query event
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {import('node-telegram-bot-api').CallbackQuery} query
 *
 * @return {Promise<void>}
 */
const handleCbQueryEvent = async (bot, query) => {
  const queryData = query.data
  const chatId = query.message?.chat.id
  const userId = query.from.id

  try {
    switch (queryData) {
      case COMMAND_CALCULATION_DETAILS:
        await detailCalculation(bot, chatId)
        break
      case COMMAND_OTHER_AUTO:
        // resemble to  "startInfo.js"
        await sendRequirementForAutoCalculation(bot, chatId)
        break
      case COMMAND_MANUAL_MODE:
        // TODO: add
        break
      case COMMAND_AUTO_AGE_LESS_3:
      case COMMAND_AUTO_AGE_3_5:
      case COMMAND_AUTO_AGE_MORE_5:
        await handleStepAgeKeyboardCb(bot, chatId, userId, queryData)
        break
      default:
        break
    }
  } catch (err) {
    console.log(err)
  } finally {
    await bot.answerCallbackQuery(query.id)
  }

}

module.exports = {
  handleCbQueryEvent
}

