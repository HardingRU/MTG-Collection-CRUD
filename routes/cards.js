const express = require('express');

const cardsRouter = express.Router();
const cardsController = require('../controllers/cardsController');
const viewsController = require('../controllers/viewsController');
const setsController = require('../controllers/setsController');

cardsRouter.get('/', cardsController.index, viewsController.showCards);
cardsRouter.post('/', cardsController.create, viewsController.cardCreate);

cardsRouter.get('/new', setsController.index, cardsController.makeBlankCard, viewsController.showAddForm);

cardsRouter.get('/:id', cardsController.getCard, views.showCard);
// cardsRouter.get('/:id', )

module.exports = cardsRouter;
