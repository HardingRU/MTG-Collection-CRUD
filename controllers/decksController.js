const decksDB = require('../models/decksDB');

module.exports = {
  index(req, res, next) {
    decksDB.findAll()
    .then(deck => {
      res.locals.decks = deck;
      next();
    })
    .catch(err => next(err));
  },

  getDeck(req, res, next) {
    decksDB.findById(req.params.id)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  }

}
