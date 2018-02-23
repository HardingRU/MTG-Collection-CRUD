# MTG-Collection-CRUD

## PROPOSAL

### NAME AND DESCRIPTION

Magic the Gathering (MTG) Collection Manager

The application is a CRUD app that will allow MTG players to manage their collection and decks.  The users will be able to add, edit and remove cards, add, edit and remove decks, as well as open a pack of cards into their collection from a selected set.

### WIREFRAMES

See wireframes folder.  Note that there are no wire frames for some of the edit functionality (edit deck, edit card), as they are essentially the same as viewing a single deck or card but with ability to modify and save back into database.

### USER STORIES

Users should be able to:

Add cards to their Collection
Modify cards in their Collection
Remove cards from their Collection

Create decks from the cards in their Collection
Edit decks once created
Delete decks as desired

Open a booster pack of 10 MTG cards that are then added to their Collection

### PHASES OF COMPLETION

Monday Feb 26 - Create basic scaffolding and server infrastructure

Tuesday Feb 27 - Add functionality for just collection (add to / modify collection) / cards (create card, edit, delete)

Wednesday Feb 28 - Add functionality for decks (create deck, edit deck, modify deck)

Thursday March 1 - Add functionality for open pack (use MTG API to add a pack of cards to collection)

Friday March 2 - Styling / CSS

REACH GOAL: Add login / auth functionality so that users have their own collections

### LINKS AND RESOURCES

The pack of cards will be generated using a third party open source MTG cards API (https://magicthegathering.io/)

This API might also be used for enhanced functionality as time requires (add card to collection using the API).
