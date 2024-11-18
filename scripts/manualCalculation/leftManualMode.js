const {setDefaultUserMode} = require('./steps/stepHelpers')

const leftManualMode = (userId) => {
  setDefaultUserMode(userId)
}

module.exports = {
  leftManualMode
}