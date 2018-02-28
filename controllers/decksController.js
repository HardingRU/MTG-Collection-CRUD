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
        res.locals.deckid = req.params.id;
        next();
      })
      .catch(err => next(err));
  },

  create(req, res, next) {
    decksDB.createDeck(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  },

  destroyDeck(req, res, next) {
    decksDB.kill(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  },

  makeBlankDeck(req, res, next) {
    const blankDeck = {
      deck_name: null
    };
    res.locals.card = blankDeck;
    next();
  },

  update(req, res, next) {
    req.body.id = req.params.id;
    decksDB.update(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  },

  addToDeck(req, res, next) {
    decksDB.addToDeck(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  },

  saveDeck(req, res, next) {
    decksDB.editNumCards(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  }


}
