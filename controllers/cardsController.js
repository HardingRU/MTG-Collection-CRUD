const cardsDB = require('../models/cardDB');

module.exports = {

  //return all cards from the database
  index(req, res, next) {
    cardsDB.findAll()
    .then(cards => {
      res.locals.cards = cards;
      next();
    })
    .catch(err => next(err));
  },

  //create a card in db using req.body input
  create(req, res, next) {
    cardsDB.save(req.body)
      .then((card) => {
        res.locals.card = card;
        next();
      })
      .catch(err => next(err));
  },

  //create a blank card
  makeBlankCard(req, res, next) {
    const blankCard = {
      name: null,
    	mana_cost: null,
    	colors: null,
    	rarity: null,
    	type: null,
    	card_text: null,
    	attack: null,
    	defense : null,
    	img_url : null,
    	num_cards : null,
    	set_id: null
    };
    res.locals.card = blankCard;
    next();
  },

  //get single card by ID from database
  getCard(req, res, next) {
    cardsDB.findById(req.params.id)
      .then((card) => {
        res.locals.card = card;
        next();
      })
      .catch(err => next(err));
  },

  //modify a card in DB (not used currently)
  update(req, res, next) {
    req.body.id = req.params.id;
    console.log(req.body)
    cardsDB.update(req.body)
      .then((card) => {
        res.locals.card = card;
        next();
      })
      .catch(err => next(err));
  },

  //remove a card from the database
  destroyCard(req, res, next) {
    cardsDB.kill(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  }

}
