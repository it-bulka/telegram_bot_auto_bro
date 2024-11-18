const COMMAND_START = '/start'
const COMMAND_CBR = '/cbr'
const COMMAND_CURRENCY_RATES = '/currrencyrates'
const COMMAND_SETTING_SERVICE = '/settingservice'
const COMMAND_MANUAL_MODE = '/manualmode'

// auto age
const COMMAND_AUTO_AGE_LESS_3 = 'auto_age_less_3'
const COMMAND_AUTO_AGE_3_5 = 'auto_age_3_5'
const COMMAND_AUTO_AGE_MORE_5 = 'auto_age_more_5'

const autoAgeText = {
  [COMMAND_AUTO_AGE_LESS_3]: 'До 3 років',
  [COMMAND_AUTO_AGE_3_5]: 'Від 3 до 5 років',
  [COMMAND_AUTO_AGE_MORE_5]: 'Від 5 років'
}

// costs / callback query
const COMMAND_CALCULATION_DETAILS = 'details'
const COMMAND_LEAVE_REQUEST = 'request'
const COMMAND_CONTACT_MANAGER = 'manager'
const COMMAND_OTHER_AUTO = 'new_auto'


module.exports = {
  COMMAND_START,
  COMMAND_CBR,
  COMMAND_CURRENCY_RATES,
  COMMAND_SETTING_SERVICE,
  COMMAND_MANUAL_MODE,
  COMMAND_CALCULATION_DETAILS,
  COMMAND_LEAVE_REQUEST,
  COMMAND_CONTACT_MANAGER,
  COMMAND_OTHER_AUTO,
  COMMAND_AUTO_AGE_LESS_3,
  COMMAND_AUTO_AGE_3_5,
  COMMAND_AUTO_AGE_MORE_5,
  autoAgeText
}