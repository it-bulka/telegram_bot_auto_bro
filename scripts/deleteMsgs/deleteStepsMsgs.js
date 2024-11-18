const { users } = require('../consts/consts')

/**
 * Delete messages from chatbot
 * @param {import('node-telegram-bot-api').TelegramBot} bot
 * @param {number} chatId
 * @param {number} userId
 *
 * @return {Promise<void>}
 */
const deleteMsgs = async (bot, chatId, userId) => {
  const messageIds = users[userId]?.msgsToDelete

  if(!messageIds || !messageIds.length) return

  try {
    const deletePromises = messageIds.map((messageId) =>
      bot.deleteMessage(chatId, messageId)
    );
    await Promise.all(deletePromises);
    users[userId].msgsToDelete = []

  } catch (error) {
    console.log("error", error)
    await bot.sendMessage(chatId, 'Server error. Try to retry using menu commands')
  }
}

/**
 * Store ids of messages which should be deleted
 * @param {number[]} messageIds
 * @param userId
 */
const setMessagesIdsForDeleting = (messageIds, userId) => {
  console.log('setMessagesIdsForDeleting', users[userId])
  if(users[userId].msgsToDelete) {
    users[userId].msgsToDelete.push(...messageIds)
    return
  }

   users[userId] = {
    ...users[userId],
    msgsToDelete: [...messageIds]
   }
}

module.exports = {
  deleteMsgs,
  setMessagesIdsForDeleting
}