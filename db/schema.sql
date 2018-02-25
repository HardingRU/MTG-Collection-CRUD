\c mtg;

DROP TABLE IF EXISTS sets;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS decks;
DROP TABLE IF EXISTS cards_decks;

CREATE TABLE sets (
  id SERIAL PRIMARY KEY,
  set_name VARCHAR(255)
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  mana_cost VARCHAR(255),
  colors VARCHAR(255),
  rarity VARCHAR(255),
  type VARCHAR(255),
  card_text VARCHAR(255),
  attack VARCHAR(255),
  defense VARCHAR(255),
  img_url VARCHAR(255),
  num_cards INT,
  set_id INTEGER REFERENCES sets
);

CREATE TABLE decks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE cards_decks (
  deck_id SERIAL PRIMARY KEY,
  card_id INT,
  num_cards INT
);
