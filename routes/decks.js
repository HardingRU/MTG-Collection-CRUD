const express = require('express');

const decksRouter = express.Router();

const decksController = require('../controllers/decksController');
const viewsController = require('../controllers/viewsController');
const cardsController = require('../controllers/cardsController');
//get all decks and render
decksRouter.get('/', decksController.index, viewsController.showDecks, viewsController.show404);
//create a new deck
decksRouter.post('/', decksController.create, viewsController.deckCreate);
//used as internal API call to add cards to a deck from the collection
decksRouter.post('/addToDeck', decksController.addToDeck, viewsController.deckEditRedirect);
//used as internal service to get user changes to deck and update accordingly
decksRouter.put('/saveDeck', decksController.saveDeck)
//front-end functionality to create new deck via user input
decksRouter.get('/new', decksController.makeBlankDeck, viewsController.addDeckForm, viewsController.show404);
//functionality to remove a single card from deck, used when user changes number value to 0 for a card in deck
decksRouter.delete('/removeCard', decksController.removeCard)
//get single deck and render
decksRouter.get('/:id', decksController.getDeck, viewsController.showDeck, viewsController.show404);
//update a single deck back-end
decksRouter.put('/:id', decksController.update, viewsController.updateDeck);
//delete a deck
decksRouter.delete('/:id', decksController.destroyDeck, viewsController.deleteDeck, viewsController.show404);
//edit a deck functionality
decksRouter.get('/:id/edit', cardsController.index, decksController.getDeck, viewsController.editDeckForm, viewsController.show404)

decksRouter.use('*', viewsController.show404)

module.exports = decksRouter;
