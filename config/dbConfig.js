/* module.exports = process.env.DATABASE_URL || {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'mtg'
}; */

function setDatabase() {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    // this would be the config of the DB when in development on our machines
    return {
      database: 'mtg',
      port: 5432,
      host: 'localhost',
    };
  } else if (process.env.NODE_ENV === 'production') {
    // HEROKU sets process.env.NODE_ENV to 'production' once pushed to that env
    return process.env.DATABASE_URL;
  }
}

const db = setDatabase();

module.exports = db;
