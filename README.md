# SQL Library Manager App
Library app using Express, sequelize and SQLite.

This app utilizes [Sequelize](https://sequelize.org/master/) to preform CRUD operations on a SQLite database. When navigating to the home route users are redirected to a books table displaying all books currently in the database (READ). From here users can choose to (CREATE) a new book or view details for an existing book. When editing or submitting a new book there is validation to ensure that *Title* and *Author* are not empty. When editing a book a user can either (UPDATE) fields or (DELETE) the particular book.

The following error handling has been implemented:
- 404 /noroute - non existent *route*
- 404 /books/:id - nonexistent *id*
- 500 - general server error



## Instructions
1. Download repo
2. CD into folder
3. Run `npm install`
4. Run `npm start`. Once the Express server is running the URL and port will be printed to console