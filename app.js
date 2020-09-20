const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

//View engine setup
app.set('view engine', 'pug');

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
 // res.send('App is running')
  res.render('index')
});


app.listen(port, () => {
  console.log('Success! The app is running. Find me at localhost:' + port);
})

module.exports = app;