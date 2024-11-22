const botRoutes = (app, bot) => {
  app.post(`/bot`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  })
}

module.exports = {
  botRoutes
}