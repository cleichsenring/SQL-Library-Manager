const express = require('express');
const router = express.Router();

//GET Home Route
router.get('/', (req, res, next) => {
  res.redirect('/books');
});

module.exports = router;