module.exports = {
  showCards(req, res) {
    res.render('cards/card-index', {
      data: res.locals.cards
    })
  }
}
