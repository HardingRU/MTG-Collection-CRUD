const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

const db = pgp(dbConfig);

module.exports = {
  // return all decks
  findAll() {
    return db.any(`SELECT * from decks`);
  },

  //return a single deck, but also look to the cards and cards/decks reference tables and pull out all cards that make up this deck
  findById(id) {
    return db.any(`SELECT cards_decks.card_id, decks.deck_name, cards.name, cards.id, cards_decks.num_in_deck, cards_decks.deck_id, cards.mana_cost, cards.colors, cards.attack, cards.defense, cards.img_url, cards.rarity, cards.type, cards.set_name, cards.card_text FROM cards INNER JOIN cards_decks ON
                   cards.id = cards_decks.card_id INNER JOIN
                   decks ON cards_decks.deck_id=decks.id WHERE decks.id = $1`, id);
  },

  //create a new deck
  createDeck(deck) {
    return db.one(`INSERT INTO decks (deck_name, deck_desc) VALUES ($[deck_name], $[deck_desc])RETURNING *`, deck);
  },

  //remove a deck from the database
  kill(id) {
    return db.none(`DELETE FROM decks WHERE id = $1`, id);
  },

  //update the name of the deck from user input
  update(deck) {
    return db.one(`UPDATE decks SET deck_name = $[deck_name] WHERE id = $[id] RETURNING * `, deck);
  },

  //adds cards from collection to the deck based on user hitting add button on front-end
  addToDeck(addition) {
    return db.one(`INSERT INTO cards_decks (deck_id, card_id, num_in_deck) VALUES ($[deckToAdd], $[cardToAdd], 1) RETURNING *`, addition)
  },

  //changes the number of a given card in a deck in database
  editNumCards(changes) {
    return db.any(`UPDATE cards_decks SET num_in_deck = $[number] WHERE card_id = $[card_id] RETURNING * `, changes);
  },

  //removes a card from the deck, called when a user changes number of cards to 0 on front-end in deck edit
  removeCard(card) {
    return db.none('DELETE from cards_decks WHERE deck_id = $[deck_id] AND card_id = $[card_id]', card);
  }
}
