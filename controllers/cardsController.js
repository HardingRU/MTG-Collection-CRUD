const cardsDB = require('../models/cardDB');

module.exports = {
  index(req, res, next) {
    cardsDB.findAll()
    .then(cards => {
      res.locals.cards = cards;
      next();
    })
    .catch(err => next(err));
  }
}
