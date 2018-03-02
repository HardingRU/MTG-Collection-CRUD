 const express = require('express');

const cardsRouter = express.Router();
const cardsController = require('../controllers/cardsController');
const viewsController = require('../controllers/viewsController');

cardsRouter.get('/', cardsController.index, viewsController.showCards);
cardsRouter.post('/', cardsController.create, viewsController.cardCreate);

cardsRouter.get('/data/', cardsController.index, viewsController.jsonCards);;
//cardsRouter.get('/new', setsController.index, cardsController.makeBlankCard, viewsController.addCardForm);

cardsRouter.get('/search', viewsController.search);

cardsRouter.get('/pack', viewsController.openPack);

cardsRouter.get('/:id', cardsController.getCard, viewsController.showCard);
cardsRouter.put('/:id', cardsController.update, viewsController.updateCard);
cardsRouter.delete('/:id', cardsController.destroyCard, viewsController.deleteCard);

//cardsRouter.get('/:id/edit', cardsController.getCard, viewsController.editCardForm)

module.exports = cardsRouter;
