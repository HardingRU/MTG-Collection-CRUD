const express = require('express');

const cardsRouter = express.Router();
const cardsController = require('../controllers/cardsController');
const viewsController = require('../controllers/viewsController');
const setsController = require('../controllers/setsController');

cardsRouter.get('/', cardsController.index, viewsController.showCards);
cardsRouter.post('/', cardsController.create, viewsController.cardCreate);

//cardsRouter.get('/new', setsController.index, cardsController.makeBlankCard, viewsController.showAddForm);

cardsRouter.get('/search', viewsController.search)
  
cardsRouter.get('/pack', viewsController.openPack)

cardsRouter.get('/:id', cardsController.getCard, viewsController.showCard);
cardsRouter.put('/:id', cardsController.update, viewsController.updateCard);
cardsRouter.delete('/:id', cardsController.destroyCard, viewsController.deleteCard);

cardsRouter.get('/:id/edit', setsController.index, cardsController.getCard, viewsController.showEditForm)

module.exports = cardsRouter;
