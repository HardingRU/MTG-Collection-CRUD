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
    req.body.num_cards = 1;
    console.log(req.body, 'body');
    cardsDB.save(req.body)
      .then((card) => {
        res.locals.card = card;
        next();
      })
      .catch(err => next(err));
  },

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

  getCard(req, res, next) {
    cardsDB.findById(req.params.id)
      .then((card) => {
        res.locals.card = card;
        next();
      })
      .catch(err => next(err));
  },

  update(req, res, next) {
    //req.body.id = data.id;
    req.body.id = req.params.id;
    cardsDB.update(req.body)
      .then((card) => {
        res.locals.card = card;
        next();
      })
      .catch(err => next(err));
  },

  destroyCard(req, res, next) {
    cardsDB.kill(req.params.id)
      .then(() => next())
      .catch(err => next(err));
  }

}
