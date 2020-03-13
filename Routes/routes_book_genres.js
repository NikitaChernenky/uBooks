const express = require('express'); // Include Express module.
const mySqlConnection = require('./connection');

const routes = express.Router();

routes.post('/create', (req, res) => { // Create a new book genre in the database.
    let genre = req.body;
    mySqlConnection.query('CALL CreateBookGenre(?);', [genre.BookGenre], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/', (req, res) => { // Get all book genres from the database.
    mySqlConnection.query('SELECT * FROM BookGenres;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/:id', (req, res) => { // Get book genre by ID from the database.
    mySqlConnection.query('SELECT * FROM BookGenres WHERE BookGenres.BookGenreID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.put('/update', (req, res) => { // Update book genre by ID in the database.
    let genre = req.body;
    mySqlConnection.query('UPDATE BookGenres SET BookGenres.BookGenre = ? WHERE BookGenres.BookGenreID = ?;', [genre.BookGenre, genre.BookGenreID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.delete('/delete/:id', (req, res) => { // Delete book genre by ID from the database.
    mySqlConnection.query('DELETE FROM BookGenres WHERE BookGenres.BookGenreID = ?;', [req.params.id], (error, results, fields) => {
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