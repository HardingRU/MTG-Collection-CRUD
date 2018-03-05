#Magic the Gathering: Collection Manager

## Application Overview
This application allows a user to manage their collection of Magic The Gathering cards, as well as to manage the decks that are built using these cards.  

## Technologies Used
- JavaScript
- Express
- PSQL
- Bootstrap
- EJS

## Approach Taken
The key approach here is how the databases are structured, which is important for this type of project.  A user can have many decks, each of which contain many cards, while a card can be in multiple decks.  To handle these relationships, I have three databases: one for cards, one for decks, and one that keeps track of the relationship between cards and decks.  

This allows me to join the databases together when needed to render appropriate information to the user.

## Installation / Instructions
The app is hosted via Heroku: https://mtgoat.herokuapp.com/
An overview of the app and functionality is available here: https://youtu.be/NdMrGDDVQh4

## User Functionality
