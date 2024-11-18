const { users} = require('../consts/consts')
const { getCost } = require('./steps/stepsMessages')
const { setMessagesIdsForDeleting } = require('../deleteMsgs/deleteStepsMsgs')

/**
 * Init manual mode and it first step
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 * @param {number} userId
 *
 * @return {Promise<void>}
 */
const initManualCalculation = async (bot, chatId, userId) => {
  //set user at first
  users[userId] = {
    manual_mode: true,
    step: 0,
    msgsToDelete: []
  }

  if(users[userId].step !== 0) {
    users[userId].step = 0
  }

  const msg = await getCost(bot, chatId)
  setMessagesIdsForDeleting([msg.message_id], userId)
}

module.exports = {
  initManualCalculation
}