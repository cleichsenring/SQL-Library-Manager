const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}


/* GET - all books */
router.get('/', asyncHandler(async (req, res) => {
  res.render('index', { });
}));

/* GET - Create a new book form */
router.get('/new', asyncHandler(async (req, res) => {
  res.render('new-book', { });
}));

/* POST - create book */
router.post('/new', asyncHandler(async (req, res) => {
  res.redirect('/books');
}));

/* GET - individual book */
router.get('/:id', asyncHandler(async (req, res) => {
  res.render('update-book', { });
}));

/* POST - Update individual book */
router.post('/', asyncHandler(async (req, res) => {

}));

/* Delete book confirmation OPTIONAL */

/* POST - Delete individual book */
router.post('/:id/delete', asyncHandler(async (req, res) => {

}));


module.exports = router;