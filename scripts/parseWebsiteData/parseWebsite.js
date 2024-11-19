const axios = require('axios')
const cheerio = require('cheerio')

const userUrl = 'https://www.che168.com/dealer/335626/52778005.html?userpid=0&usercid=0#pvareaid=110519'
const parseWebsite = async () => {
  try {
    const response = await axios.get(userUrl)
    const $ = cheerio.load(response.data);

    // Наприклад, отримуємо всі заголовки h2
    const tagWithPrice = $('#overlayPrice').text().trim()
    const price = tagWithPrice.match(/[\d.]+/)[0]

    console.log('price', price)
  } catch (error) {
    console.error('Помилка при парсингу:', error.message);
    return 'Не вдалося отримати дані 😢';
  }
}

module.exports = {
  parseWebsite
}