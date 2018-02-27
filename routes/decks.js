const express = require('express');

const decksRouter = express.Router();

const decksController = require('../controllers/decksController');
const viewsController = require('../controllers/viewsController');

decksRouter.get('/', decksController.index, viewsController.showDecks);

decksRouter.get('/:id', decksController.getDeck, viewsController.showDeck);

module.exports = decksRouter;
