var express = require('express');
const router = express.Router();
var bookController = require('../Controller/bookController');

router.get('/books', bookController.getBookList);
router.get('/books/details/:bookId', bookController.getBookDetails);
router.put('/book/update', bookController.updateBook);
router.delete('/book/delete/:bookId', bookController.deleteBook);

module.exports = router;