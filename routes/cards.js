const express = require('express');

const cardsRouter = express.Router();
const cardsController = require('../controllers/cardsController')
const viewsController = require('../controllers/viewsController')

cardsRouter.get('/', cardsController.index, viewsController.showCards);
cardsRouter.post('/', cardsController.create, viewsController.cardCreate);

// cardsRouter.get('/:id', )

module.exports = cardsRouter;
