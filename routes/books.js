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
  res.render('book/new-book', { book:{},title: 'New Book' });
}));

/* POST - create book */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/books');
  } catch (error) {
    if(error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      res.render('book/new-book', { book, title: 'New Book', errors: error.errors });
    }
  }
}));

/* GET - individual book */
router.get('/:id', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render('book/update-book', { book , title: 'Update book'});
  } else {
    const err = new Error('The book you are looking for decided to go elsewhere...');
    next(err);
  }
}));

/* POST - Update individual book */
router.post('/:id', asyncHandler(async (req, res) => {
  let book = await Book.findByPk(req.params.id);
  try {
    await book.update(req.body);
    res.redirect('/books');
  } catch (error) {
    if(error.name === 'SequelizeValidationError'){
      book = await Book.build(req.body);
      book.id = req.params.id; //Set the book ID to update once errors are fixed
      res.render('book/update-book', { book, title:'Update book', errors: error.errors });
    } else {
      throw error;
    }

  }

}));

/* POST - Delete individual book */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books');
}));

module.exports = router;