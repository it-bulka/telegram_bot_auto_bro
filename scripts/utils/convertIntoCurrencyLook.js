/**
 * Convert number into currency look
 * @param {number} num
 * @return {string}
 */
const convertIntoCurrencyLook = (num) => {
    // type Intl.NumberFormat
    const formatter =  new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  })

  return formatter.format(num)
}

module.exports = {
  convertIntoCurrencyLook
}