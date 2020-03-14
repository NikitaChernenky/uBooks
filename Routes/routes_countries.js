const express = require('express'); // Include Express module.
const routes = express.Router();
const mySqlConnection = require('./connection');

routes.post('/create', (req, res) => { // Create a new country in the database.
    let country = req.body;
    mySqlConnection.query('INSERT INTO countries(`CountryID`, `CountryName`, `CountryCode`) VALUES (?, ?, ?);', [country.CountryID, country.CountryName, country.CountryCode], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/', (req, res) => { // Get all countries from the database.
    mySqlConnection.query('SELECT * FROM Countries;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/:id', (req, res) => { // Get country by ID from the database.
    mySqlConnection.query('SELECT * FROM Countries WHERE Countries.CountryID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.put('/update', (req, res) => { // Update country by ID in the database.
    let country = req.body;
    mySqlConnection.query('UPDATE Countries SET Countries.CountryName = ?, Countries.CountryCode = ? WHERE Countries.CountryID = ?;', [country.CountryName, country.CountryCode, country.CountryID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.delete('/delete/:id', (req, res) => { // Delete country by ID from the database.
    mySqlConnection.query('DELETE FROM Countries WHERE Countries.CountryID = ?;', [req.params.id], (error, results, fields) => {
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