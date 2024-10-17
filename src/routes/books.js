const router = require('express').Router();

const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
  } = require('../controllers/books')

router.get("/", getBooks); 
router.get("/:book_id", getBook); 
router.post("/", createBook); 
router.patch("/:book_id", updateBook); 
router.delete("/:book_id", deleteBook);

module.exports = router;
