const { users } = require('../consts/consts')
const { autoAgeText } = require('../consts/commands')
const { increaseStep, setDefaultUserMode} = require('./steps/stepHelpers')
const { getCost, getAutoAge, getEngine } = require('./steps/stepsMessages')
const { get_auto_age_keyboard} = require('../keyboard/inlineKeyboard')
const { sendWaitingMsg } = require('../costs/sendWaitingMsg')
const { setMessagesIdsForDeleting, deleteMsgs} = require('../deleteMsgs/deleteStepsMsgs')

/**
 * Class for manual calculation checks and step handling in a bot workflow.
 */
class ManualCalculationChecker {
  /**
   * @param {import('node-telegram-bot-api').TelegramBot} bot - The bot instance used for sending messages and handling interactions.
   */
  constructor(bot) {
    /**
     * The bot instance.
     * @type {import('node-telegram-bot-api').TelegramBot}
     */
    this.bot = bot
    this.chatId = null
    this.step = 0
  }

  /**
   * Checks the manually entered cost value and updates the user's data.
   * @param {string} manualNumText - The manually entered cost as text.
   * @param {import('../types').User} userRef - The reference to the user object.
   * @throws {Error} If the cost is not a valid number.
   * @private
   */
  _checkManualCost(manualNumText, userRef)  {
    const cost = Number(manualNumText)
    if(isNaN(cost)) {
      throw new Error('Not correct cost. It should be a number')
    }

    userRef.autoData = {
      ...userRef.autoData,
      cost
    }
  }

  /**
   * Checks the manually entered auto age and updates the user's data.
   * @param {import('../types').AutoAge} autoAge - The selected auto age.
   * @param {import('../types').User} userRef - The reference to the user object.
   * @throws {Error} If the auto age is not valid.
   * @private
   */
  _checkManualAutoAge(autoAge, userRef) {
    const isCorrect = Object.values(autoAgeText).find(age => age === autoAge)

    if(isCorrect) {
      userRef.autoData = {
        ...userRef.autoData,
        age: autoAge
      }
    } else {
      throw new Error('Not correct age of auto. You should`ve chose one of the button')
    }
  }

  /**
   * Checks the manually entered engine value and updates the user's data.
   * @param {string} engine - The entered engine value as text.
   * @param {import('../types').User} userRef - The reference to the user object.
   * @throws {Error} If the engine value is not valid.
   * @private
   */
  _checkManualEngine(engine, userRef) {
    // should be 4 for cm3
    const isCorrectLength = engine.length === 4
    const enginNum = Number(engine)

    if(isNaN(enginNum) || !isCorrectLength) {
      throw new Error('Not correct engine data. It must be a four-digit number, measured in cubic centimeters.')
    }

    userRef.autoData = {
      ...userRef.autoData,
      engine: enginNum
    }
  }

  /**
   * Sends the final result message to the user.
   * @param {string} text - The text message to send.
   * @param {import('../types').User} user - The user object to whom the result is sent.
   * @private
   */
  async _sendResult(userId) {
    const { age, engine, cost} = users[userId].autoData
    await sendWaitingMsg(this.bot, this.chatId, {cost, engine, age})

    // TODO: send result of calculation
  }

  handlers = {
    [0]: this._checkManualCost,
    [1]: this._checkManualAutoAge,
    [2]: this._checkManualEngine,
  }

  async _deletePrevStepMsgs(userId) {
    await deleteMsgs(this.bot, this.chatId, userId)
  }
  /**
   * Sends the message for the next step based on the current step.
   * @param {0|1|2|3} step - The current step number.
   * @param {number} chatId - The chat ID to send the message to.
   * @private
   */
  async _nextStepMsg(userId) {
    await this._deletePrevStepMsgs(userId)

    const nextStep = increaseStep(userId)
    const stepsMsg = {
      [0]: getCost,
      [1]: getAutoAge,
      [2]: getEngine
    }

    const stepFn = stepsMsg[nextStep]

    if(!stepFn && nextStep === 3) {
      await this._sendResult(userId)
      setDefaultUserMode(userId)
      return
    }

    const { message_id: msgId } = await stepFn?.(this.bot, this.chatId)
    setMessagesIdsForDeleting([msgId], userId)
  }

  /**
   * Set keyboard for message about error depends o step
   * @param {0|1|2|3} step
   * @returns {import('node-telegram-bot-api').SendMessageOptions}
   * @private
   */
  _setKeyboardForStepErrMsg(step) {
    let options = {}
    if(step === 1) {
      options = {
        reply_markup: JSON.stringify({
          inline_keyboard: get_auto_age_keyboard
        })
      }
    }

    return options
  }

  async _handleDataFromUser(user, text) {
    const fn = this.handlers[this.step]
    fn(text,user)
  }

  /**
   * Handles the step-based workflow for a user.
   * @param {number} chatId - The chat ID of the user.
   * @param {number} userId - The ID of the user.
   * @param {number | null} msgId -
   * @param {string} text - The text entered by the user.
   * @returns {Promise<void>} Resolves when the step is processed.
   */
  async handleSteps(chatId, userId, msgId, text) {
    const user = users[userId]

    this.step = user.step || 0
    if(!this.chatId) {
      this.chatId = chatId
    }

    if(msgId) setMessagesIdsForDeleting([msgId], userId)

    try {
      await this._handleDataFromUser(user, text)
      await this._nextStepMsg(userId)
    } catch (err) {
      const msg = err.message

      const options = this._setKeyboardForStepErrMsg(this.step)
      const msg1 = await this.bot.sendMessage(this.chatId, msg, options)
      const msg2 = await this.bot.sendMessage(this.chatId, 'Try one more time')
      setMessagesIdsForDeleting([msg1.message_id, msg2.message_id], userId)
    }
  }
}

module.exports = {
  ManualCalculationChecker
}