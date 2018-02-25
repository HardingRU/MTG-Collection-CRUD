const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

const db = pgp(dbConfig);

module.exports = {
  findAll() {
    return db.many(`SELECT * from cards`);
  },
  save(card) {
    return db.one(`
      INSERT INTO cards (name, mana_cost, colors, rarity, type, card_text, attack, defense, img_url, num_cards, set_id)
      VALUES ($[name], $[mana_cost], $[colors], $[rarity], $[type], $[card_text], $[attack], $[defense], $[img_url], $[num_cards], $[set_id])
      RETURNING *
      `, card);
  }
}
