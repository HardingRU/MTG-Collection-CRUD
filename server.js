const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const cardsRouter = require('./routes/cards');
const decksRouter = require('./routes/decks')

const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(methodOverride('_method'));


app.get('/', (req, res) => {
  res.render("index");
})

app.use('/cards', cardsRouter)

app.use('/decks', decksRouter)

app.listen(PORT, (req, res) => {
  console.log("Listening on Port " + PORT);
})
