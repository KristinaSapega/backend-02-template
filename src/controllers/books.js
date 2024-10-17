const Book = require('../models/book');

const getBooks = (request, response) => {
    return Book.find({})
        .then((books) => {
            response.status(200).send(books);
        })
        .catch((error) => response.status(500).send(error.message));
};

const getBook = (request, response) => {
    const { book_id } = request.params;
    return Book.findById(book_id)
        .then((book) => {
            response.status(200).send(book);
        })
        .catch((error) => response.status(500).send(error.message));
};

const createBook = (request, response) => {
    const newBook = new Book({
        title: request.body.title,
        author: request.body.author,
        year: request.body.year
    });

    newBook.save()
        .then((book) => {
            response.status(201).send(book);
        })
        .catch((error) => response.status(400).send(error.message));

};

const updateBook = (request, response) => {
    const { book_id } = request.params;
    Book.findByIdAndUpdate(book_id, request.body, { new: true, runValidators: true })
        .then((book) => {
            if (!book) {
                return response.status(404).send("Book not found");
            }
            response.status(200).send(book);
        })
        .catch((error) => response.status(400).send(error.message));

};

const deleteBook = (request, response) => {
    const { book_id } = request.params;
    Book.findByIdAndDelete(book_id)
        .then((book) => {
            if (!book) {
                return response.status(404).send("Book not found");
            }
            response.status(200).send({ message: "Book deleted successfully" });
        })
        .catch((error) => response.status(500).send(error.message));
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}
