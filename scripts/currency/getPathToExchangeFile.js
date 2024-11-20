const path = require('path')
const fs = require('fs/promises')

const ensureDirectoryExists = async (filePath) => {
  const dir = path.dirname(filePath)
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch (err) {
    console.error('Error creating directory:', err)
    throw err
  }
}

const getExchangeFilePath = async () => {
  const filePath = path.resolve(__dirname, 'scripts', 'currency', 'exchangeRates.json')
  await ensureDirectoryExists(filePath)
  return filePath
}

module.exports = {
  getExchangeFilePath
}