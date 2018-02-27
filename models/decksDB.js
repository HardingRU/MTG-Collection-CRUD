const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

const db = pgp(dbConfig);

module.exports = {
  findAll() {
    return db.many(`SELECT * from decks`);
  },

  findById(id) {
    return db.many(`SELECT decks.deck_name, cards.name, cards_decks.num_in_deck FROM cards INNER JOIN cards_decks ON
                   cards.id = cards_decks.card_id INNER JOIN
                   decks ON cards_decks.deck_id=decks.id WHERE decks.id = $1`, id);
  },

  createDeck(deck) {
    return db.one(`INSERT INTO decks (deck_name) VALUES ($[deck_name])RETURNING *`, deck);
  },

  kill(id) {
    return db.none(`DELETE FROM decks WHERE id = $1`, id);
  },

  updateDeck(deck) {
    return db.none()
  }
}
