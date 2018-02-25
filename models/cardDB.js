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
  },
  findById(id) {
    return db.one(`SELECT * from cards WHERE id = $1`, id);
  },
  update(card) {
    console.log(card);
    return db.one(`
      UPDATE cards
      SET
      name = $[name],
      mana_cost = $[mana_cost],
      colors = $[colors],
      rarity = $[rarity],
      type = $[type],
      card_text = $[card_text],
      attack = $[attack],
      defense = $[defense],
      img_url = $[img_url],
      num_cards = $[num_cards],
      set_id = $[set_id]
      WHERE id = $[id]
      RETURNING *
      `, card);
  }
}
