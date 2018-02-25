\c mtg;

INSERT INTO sets (set_name) VALUES ('Khans of Tarkhir');
INSERT INTO cards (name, mana_cost, colors, rarity, type, card_text, attack, defense, img_url, num_cards, set_id) VALUES
  (
    'Narset, Enlightened Master',
    '{3}{U}{R}{W}',
    ARRAY['White', 'Blue', 'Red'],
    'Mythic Rare',
    'Legendary Creature - Human Monk',
    'First strike, hexproof. Whenever Narset, Enlightened Master attacks, exile the top four cards of your library. Until end of turn, you may cast noncreature cards exiled with Narset this turn without paying their mana costs.',
    '3',
    '2',
    'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=386616&type=card',
    '4',
    '1'
  );
