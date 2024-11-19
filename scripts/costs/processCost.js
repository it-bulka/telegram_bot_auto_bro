const { sendWaitingMsg } = require('./sendWaitingMsg')
const { sendCost } = require('./sendCost')
const { parseWebsite } = require('../parseWebsiteData/parseWebsite')
/**
 * Send message about processing cost info
 * @param bot
 * @param chatId
 */
const processCost = async (bot, chatId) => {
  try {
    // TODO: get real data from website paesing
    const mockData = { age: "До 3 років", cost: 45623, engine: 1269 }

    await sendWaitingMsg(bot, chatId, mockData)
    await parseWebsite()
    await sendCost(bot, chatId)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  processCost
}