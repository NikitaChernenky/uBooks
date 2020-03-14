const express = require('express'); // Include Express module.
const routes = express.Router();
const mySqlConnection = require('./connection');

routes.post('/create', (req, res) => { // Create a new book in the database.
    let book = req.body;
    mySqlConnection.query('INSERT INTO Books (`BookID`, `UserID`, `ISBN`, `BookCover`, `BookTitle`, `BookAuthor`, `BookGenreID`, `PublicationYear`, `BookOverview`, `Quantity`, `Price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [book.BookID, book.UserID, book.ISBN, book.BookCover, book.BookTitle, book.BookAuthor, book.BookGenreID, book.PublicationYear, book.BookOverview, book.Quantity, book.Price], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/', (req, res) => { // Get all books from the database.
    mySqlConnection.query('SELECT Books.BookID, Books.UserID, Users.Name, Users.Surname, Users.AdminRole, Books.ISBN, Books.BookCover, Books.BookTitle, Books.BookAuthor, Books.BookGenreID, BookGenres.BookGenre, Books.PublicationYear, Books.BookOverview, Books.Quantity, Books.Price FROM Books INNER JOIN BookGenres ON Books.BookGenreID = BookGenres.BookGenreID INNER JOIN Users ON Books.UserID = Users.UserID;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/:id', (req, res) => { // Get book by ID from the database.
    mySqlConnection.query('SELECT Books.BookID, Books.UserID, Users.Name, Users.Surname, Books.ISBN, Books.BookCover, Books.BookTitle, Books.BookAuthor, Books.BookGenreID, BookGenres.BookGenre, Books.PublicationYear, Books.BookOverview, Books.Quantity, Books.Price FROM Books INNER JOIN BookGenres ON Books.BookGenreID = BookGenres.BookGenreID INNER JOIN Users ON Books.UserID = Users.UserID WHERE Books.BookID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/customer/:id', (req, res) => { // Get book by customer ID from the database.
    mySqlConnection.query('SELECT Books.BookID, Books.UserID, Users.Name, Users.Surname, Books.ISBN, Books.BookCover, Books.BookTitle, Books.BookAuthor, Books.BookGenreID, BookGenres.BookGenre, Books.PublicationYear, Books.BookOverview, Books.Quantity, Books.Price FROM Books INNER JOIN BookGenres ON Books.BookGenreID = BookGenres.BookGenreID INNER JOIN Users ON Books.UserID = Users.UserID WHERE Books.UserID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.put('/update', (req, res) => { // Update book by ID in the database.
    let book = req.body;
    mySqlConnection.query('UPDATE Books SET Books.UserID = ?, Books.ISBN = ?, Books.BookCover = ?, Books.BookTitle = ?, Books.BookAuthor = ?, Books.BookGenreID = ?, Books.PublicationYear = ?, Books.BookOverview = ?, Books.Quantity = ?, Books.Price = ? WHERE Books.BookID = ?', [book.UserID, book.ISBN, book.BookCover, book.BookTitle, book.BookAuthor, book.BookGenreID, book.PublicationYear, book.BookOverview, book.Quantity, book.Price, book.BookID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.delete('/delete/:id', (req, res) => { // Delete book by ID from the database.
    mySqlConnection.query('DELETE FROM Books WHERE Books.BookID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send('Deleted successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

module.exports = routes; // Export routes object with CRUD functions.