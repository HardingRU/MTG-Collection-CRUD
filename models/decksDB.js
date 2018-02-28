const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

const db = pgp(dbConfig);

module.exports = {
  findAll() {
    return db.many(`SELECT * from decks`);
  },

  findById(id) {
    return db.many(`SELECT cards_decks.card_id, decks.deck_name, cards.name, cards_decks.num_in_deck, cards_decks.deck_id FROM cards INNER JOIN cards_decks ON
                   cards.id = cards_decks.card_id INNER JOIN
                   decks ON cards_decks.deck_id=decks.id WHERE decks.id = $1`, id);
  },

  createDeck(deck) {
    return db.one(`INSERT INTO decks (deck_name) VALUES ($[deck_name])RETURNING *`, deck);
  },

  kill(id) {
    return db.none(`DELETE FROM decks WHERE id = $1`, id);
  },

  update(deck) {
    return db.one(`UPDATE decks SET deck_name = $[deck_name] WHERE id = $[id] RETURNING * `, deck);
  },

  addToDeck(addition) {
    return db.one(`INSERT INTO cards_decks (deck_id, card_id, num_in_deck) VALUES ($[deckToAdd], $[cardToAdd], 1) RETURNING *`, addition)
  },

  editNumCards(changes) {
    console.log(changes)
    return db.one(`UPDATE cards_decks SET num_in_deck = $[number] WHERE card_id = $[card_id] RETURNING * `, changes);
  }
}
