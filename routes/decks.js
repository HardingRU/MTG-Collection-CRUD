const express = require('express');

const decksRouter = express.Router();

const decksController = require('../controllers/decksController');
const viewsController = require('../controllers/viewsController');

decksRouter.get('/', decksController.index, viewsController.showDecks);
decksRouter.post('/', decksController.create, viewsController.deckCreate);

decksRouter.get('/new', decksController.makeBlankDeck, viewsController.addDeckForm);

decksRouter.get('/:id', decksController.getDeck, viewsController.showDeck);

//decksRouter.put('/:id', decksController.update, viewsController.updateDeck);
decksRouter.delete('/:id', decksController.destroyDeck, viewsController.deleteDeck);

module.exports = decksRouter;
