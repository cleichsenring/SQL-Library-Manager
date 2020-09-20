const express = require('express');
const sequelize = require('./models').sequelize;


const app = express();
const port = process.env.PORT || 3000;


//Routes import
const routes = require('./routes/index');
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


//Error handles
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err ;
  res.status(err.status || 500);
  res.render('error');
});


//Sync DB and then listen on PORT
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('Success! The app is running. Find me at localhost:' + port);
  })
});
  
module.exports = app;