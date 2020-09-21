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
  const books = await Book.findAll();
  res.render('index', { books, title: 'Books'});
}));

/* GET - Create a new book form */
router.get('/new', asyncHandler(async (req, res) => {
  res.render('new-book', { title: 'New Book' });
}));

/* POST - create book */
router.post('/new', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect('/books');
}));

/* GET - individual book */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', { book , title: 'Update book'});
}));

/* POST - Update individual book */
router.post('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books');

}));

/* POST - Delete individual book */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));


module.exports = router;