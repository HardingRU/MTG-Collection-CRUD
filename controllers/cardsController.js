const cardsDB = require('../models/cardDB');

module.exports = {
  index(req, res, next) {
    cardsDB.findAll()
    .then(cards => {
      res.locals.cards = cards;
      next();
    })
    .catch(err => next(err));
  },

  create(req, res, next) {
    console.log(req.body, 'body');
    cardsDB.save(req.body)
      .then((quote) => {
        res.locals.card = req.body;
        next();
      })
      .catch(err => next(err));
  }

}
