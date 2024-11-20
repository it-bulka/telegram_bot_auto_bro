const axios = require("axios")
const fs = require('node:fs/promises')
const { getExchangeFilePath } = require('./getPathToExchangeFile')

const POLISH_NATIONAL_BANK_API = 'https://api.nbp.pl/api/exchangerates/tables/A/last/1/?format=json'

// TODO: add DB
const fetchAndSaveExchangeRates = async () => {
  const res = await axios.get(POLISH_NATIONAL_BANK_API)
  const rates = res.data[0].rates
  const filteredRates = rates.filter(rate =>
    ['EUR', 'USD', 'CNY'].includes(rate.code)
  )
  const filePath = await getExchangeFilePath()
  await fs.writeFile(filePath, JSON.stringify(filteredRates, null, 2))
}

module.exports = {
  fetchAndSaveExchangeRates
}