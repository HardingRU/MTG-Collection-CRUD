const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

const db = pgp(dbConfig);

module.exports = {
  findAll() {
    return db.many(`SELECT * from cards`);
  },

  save(card) {
    return db.one(`
      INSERT INTO cards (name, mana_cost, colors, rarity, type, card_text, attack, defense, img_url, num_cards, api_id, set_name)
      VALUES ($[name], $[mana_cost], $[colors], $[rarity], $[type], $[card_text], $[attack], $[defense], $[img_url], $[num_cards], $[api_id], $[set_name])
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
      set_name = $[set_name]
      WHERE id = $[id]
      RETURNING *
      `, card);
  },

  kill(id) {
    return db.none(`DELETE FROM cards WHERE id = $1`, id);
  }
}
