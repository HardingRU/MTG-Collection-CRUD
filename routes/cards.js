 const express = require('express');

const cardsRouter = express.Router();
const cardsController = require('../controllers/cardsController');
const viewsController = require('../controllers/viewsController');

cardsRouter.get('/', cardsController.index, viewsController.showCards, viewsController.show404);
cardsRouter.post('/', cardsController.create, viewsController.cardCreate);

cardsRouter.get('/data/', cardsController.index, viewsController.jsonCards, viewsController.show404);
//cardsRouter.get('/new', setsController.index, cardsController.makeBlankCard, viewsController.addCardForm);

cardsRouter.get('/search', viewsController.search, viewsController.show404);

cardsRouter.get('/pack', viewsController.openPack, viewsController.show404);

cardsRouter.get('/:id', cardsController.getCard, viewsController.showCard, viewsController.show404);
cardsRouter.put('/:id', cardsController.update, viewsController.updateCard);
cardsRouter.delete('/:id', cardsController.destroyCard, viewsController.deleteCard);

cardsRouter.use('*', viewsController.show404)

//cardsRouter.get('/:id/edit', cardsController.getCard, viewsController.editCardForm)

module.exports = cardsRouter;
