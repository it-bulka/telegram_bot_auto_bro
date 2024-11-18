const {
  COMMAND_CALCULATION_DETAILS,
  COMMAND_LEAVE_REQUEST,
  COMMAND_CONTACT_MANAGER,
  COMMAND_OTHER_AUTO, autoAgeText, COMMAND_AUTO_AGE_LESS_3, COMMAND_AUTO_AGE_3_5, COMMAND_AUTO_AGE_MORE_5
} = require('../consts/commands')

// REPEATED BUTTONS
const otherAutoBtn = { text: 'Розрахувати вартість іншого авто', callback_data: COMMAND_OTHER_AUTO}
const contactManagerBtn = { text: 'Зв\'язатися з менеджером', url: 'https://t.me/iva147iva147', callback_data: COMMAND_CONTACT_MANAGER}

// TODO: what action for 'Залишити заявку'
const inline_keyboards = {
  send_costs_keyboard: [
    [{ text: 'Деталізація розрахунку', callback_data: COMMAND_CALCULATION_DETAILS}],
    [{ text: 'Залишити заявку', callback_data: COMMAND_LEAVE_REQUEST}],
    [contactManagerBtn],
    [otherAutoBtn]
  ],
  calculation_details_keyboard: [
    [contactManagerBtn],
    [otherAutoBtn]
  ],
  currency_rate_keyboard: [
    [contactManagerBtn],
    [otherAutoBtn]
  ],
  check_url_keyboard: [
    [contactManagerBtn]
  ],
  get_auto_age_keyboard:[
    [
      { text: autoAgeText[COMMAND_AUTO_AGE_LESS_3], callback_data: COMMAND_AUTO_AGE_LESS_3 },
      { text: autoAgeText[COMMAND_AUTO_AGE_3_5], callback_data: COMMAND_AUTO_AGE_3_5 },
      { text: autoAgeText[COMMAND_AUTO_AGE_MORE_5], callback_data: COMMAND_AUTO_AGE_MORE_5 }
    ]
  ]
}

module.exports = inline_keyboards


