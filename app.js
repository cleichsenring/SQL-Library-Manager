const express = require('express');
const sequelize = require('./models').sequelize;


const app = express();
const port = process.env.PORT || 3000;


//Routes import
const routes = require('./routes/');
const books = require('./routes/books');

//View engine setup
app.set('view engine', 'pug');

//App middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', routes);
app.use('/books', books);

//404 middleware 
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'This page does not exist'
  next(err)
});

//Global error handler
app.use((err, req, res, next) => {
  err.message = err.message || 'Whoops, looks like the server took a nap. An unknown error has occurred';
  res.status(err.status || 500);
  console.log('The following error just occurred:', err);
  err.status === 404 ? res.render('page-not-found', {err}) : res.render('error', {err});
});


//Sync DB and then listen on PORT
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('Success! The app is running. Find me at localhost:' + port);
  })
});
  
module.exports = app;