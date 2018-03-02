const express = require('express');

const decksRouter = express.Router();

const decksController = require('../controllers/decksController');
const viewsController = require('../controllers/viewsController');
const cardsController = require('../controllers/cardsController');

decksRouter.get('/', decksController.index, viewsController.showDecks);
decksRouter.post('/', decksController.create, viewsController.deckCreate);

decksRouter.post('/addToDeck', decksController.addToDeck, viewsController.deckEditRedirect);
decksRouter.put('/saveDeck', decksController.saveDeck)

decksRouter.get('/new', decksController.makeBlankDeck, viewsController.addDeckForm);

decksRouter.delete('/removeCard', decksController.removeCard)

decksRouter.get('/:id', decksController.getDeck, viewsController.showDeck);

decksRouter.put('/:id', decksController.update, viewsController.updateDeck);
decksRouter.delete('/:id', decksController.destroyDeck, viewsController.deleteDeck);

decksRouter.get('/:id/edit', cardsController.index, decksController.getDeck, viewsController.editDeckForm)

module.exports = decksRouter;
