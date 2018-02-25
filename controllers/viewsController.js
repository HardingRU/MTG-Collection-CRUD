module.exports = {
  showCards(req, res) {
    res.render('cards/card-index', {
      data: res.locals.cards
    })
  },
  cardCreate(req, res) {
    res.redirect('/cards')
  },
  showAddForm(req, res) {
    console.log(res.locals.card);
    res.render('cards/card-add');
  }
}
