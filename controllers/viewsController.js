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
    //console.log(res.locals.card);
    res.render('cards/card-add');
  },

  showCard(req, res) {
    console.log(res.locals.card.img_url)
    res.render('cards/card-single', {
      data: res.locals.card,
    });
  },

  updateCard(req, res) {
    res.redirect(`/cards/${req.params.id}`);
  },

  showEditForm(req, res) {
    res.render('cards/card-edit', {
      data: res.locals.card,
    });
  },

  deleteCard(req, res) {
    res.redirect('/cards');
  }
}
