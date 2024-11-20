const fs = require('fs/promises')
const { fetchAndSaveExchangeRates } = require('./fetchAndSaveExchangeRates')
const { getExchangeFilePath } = require('./getPathToExchangeFile')

//TODO: optimize with crone (2 times per day) ???
/**
 * @typedef {import('../types').Currency} Currency
 */

/**
 *
 * @return {Promise<Currency[]>}
 */
const getOfficialCurrencyRates = async () => {
  try {
    const filePath = await getExchangeFilePath()
    const data = await fs.readFile(filePath, 'utf-8')
    const rates = JSON.parse(data)

    return rates
  } catch (err) {
    console.error('Problem reading exchangeRates.json', err)
    await fetchAndSaveExchangeRates()
    return null
  }

}

module.exports = {
  getOfficialCurrencyRates
}