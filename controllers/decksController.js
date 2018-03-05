const decksDB = require('../models/decksDB');

module.exports = {
  //return all decks
  index(req, res, next) {
    decksDB.findAll()
    .then(deck => {
      res.locals.decks = deck;
      next();
    })
    .catch(err => next(err));
  },

  //return cards from a single deck, which is a triple join request on decks, cards, cards_decks
  getDeck(req, res, next) {
    decksDB.findById(req.params.id)
      .then((deck) => {
        res.locals.deck = deck;
        res.locals.deckid = req.params.id;
        next();
      })
      .catch(err => next(err));
  },

  //create a new deck
  create(req, res, next) {
    decksDB.createDeck(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  },

  //remove a deck from database
  destroyDeck(req, res, next) {
    decksDB.kill(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  },

  //create blank deck
  makeBlankDeck(req, res, next) {
    const blankDeck = {
      deck_name: null
    };
    res.locals.card = blankDeck;
    next();
  },

  //update a deck (just the data in the deck database, deck name description )
  update(req, res, next) {
    req.body.id = req.params.id;
    decksDB.update(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  },

  //add a new card to a deck
  addToDeck(req, res, next) {
    decksDB.addToDeck(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  },

  //update number of cards in a deck when user changes number value for any card in deck
  saveDeck(req, res, next) {
    decksDB.editNumCards(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  },

  //remove a card from the deck, which happens when a user changes the number of a card to 0 in a deck
  removeCard(req, res, next) {
    decksDB.removeCard(req.body)
      .then((deck) => {
        res.locals.deck = deck;
        next();
      })
      .catch(err => next(err));
  }


}
