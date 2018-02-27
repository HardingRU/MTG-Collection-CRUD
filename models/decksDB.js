const pgp = require('pg-promise')();
const dbConfig = require('../config/dbConfig');

const db = pgp(dbConfig);

module.exports = {
  findAll() {
    return db.many(`SELECT * from decks`);
  },
  
  findById(id) {
    return db.one(`SELECT * from decks WHERE id = $1`, id);
  }
}
