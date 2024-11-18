const { users } = require('../../consts/consts')

/**
 * Increase step for manual calculation
 * @param {number} userId
 * @return {number | undefined}
 */
const increaseStep = (userId) => {
  if(users[userId].step === 3) return

  users[userId].step = users[userId].step + 1
  return users[userId].step
}


/**
 * @param {number} userId
 */
const setDefaultUserMode = (userId) => {
  users[userId] = {
    ...users[userId],
    manual_mode: false,
    step: 0
  }
}

module.exports = {
  increaseStep,
  setDefaultUserMode
}