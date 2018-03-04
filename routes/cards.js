 const express = require('express');

const cardsRouter = express.Router();
const cardsController = require('../controllers/cardsController');
const viewsController = require('../controllers/viewsController');
// get all cards
cardsRouter.get('/', cardsController.index, viewsController.showCards, viewsController.show404);
//create new card
cardsRouter.post('/', cardsController.create, viewsController.cardCreate);
//used as part of an internal API call to get all card data and pass to editDeck.js for rending cards on edit deck page 
cardsRouter.get('/data/', cardsController.index, viewsController.jsonCards, viewsController.show404);
//search for card using 3rd party API
cardsRouter.get('/search', viewsController.search, viewsController.show404);
//open pack functionality
cardsRouter.get('/pack', viewsController.openPack, viewsController.show404);
//single card page functionality
cardsRouter.get('/:id', cardsController.getCard, viewsController.showCard, viewsController.show404);
//update single card
cardsRouter.put('/:id', cardsController.update, viewsController.updateCard);
//delete single card
cardsRouter.delete('/:id', cardsController.destroyCard, viewsController.deleteCard);

cardsRouter.use('*', viewsController.show404)

module.exports = cardsRouter;
