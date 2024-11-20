const cron = require('node-cron')
const { fetchAndSaveExchangeRates } = require('./scripts/currency/fetchAndSaveExchangeRates')

const startCronJobs = () => {
  cron.schedule('30 12 * * * * *', async () => {
    await fetchAndSaveExchangeRates()
  })
}
