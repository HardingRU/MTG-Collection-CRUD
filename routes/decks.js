const express = require('express');

const decksRouter = express.Router();

//const decksController = require('../controllers/decksController');
const viewsController = require('../controllers/viewsController');

decksRouter.get('/', viewsController.showDecks);

module.exports = decksRouter;
