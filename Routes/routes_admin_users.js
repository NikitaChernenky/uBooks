const express = require('express'); // Include Express module.
const mySqlConnection = require('./connection');

const routes = express.Router();

routes.post('/create', (req, res) => { // Create a new admin user in the database.
    let admin = req.body;
    mySqlConnection.query("CALL CreateAdmin(?, ?, ?, ?);", [admin.Name, admin.Surname, admin.Email, admin.Password], (error, results, fields) => {
        if (!error) {
            res.send('Created successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/', (req, res) => { // Get all admin users from the database.
    mySqlConnection.query('SELECT Users.UserID, Users.Name, Users.Surname, Users.Email, Users.Password, Users.AdminRole FROM Users WHERE Users.AdminRole = 1;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/:id', (req, res) => { // Get admin user by ID from the database.
    mySqlConnection.query('SELECT Users.UserID, Users.Name, Users.Surname, Users.Email, Users.Password, Users.AdminRole FROM Users WHERE Users.AdminRole = 1 AND Users.UserID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.put('/update', (req, res) => { // Update admin user by ID in the database.
    let admin = req.body;
    mySqlConnection.query('UPDATE Users SET Users.Name = ?, Users.Surname = ?, Users.Email = ?, Users.Password = ? WHERE Users.UserID = ?;', [admin.Name, admin.Surname, admin.Email, admin.Password, admin.UserID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.delete('/delete/:id', (req, res) => { // Delete admin user by ID from the database.
    mySqlConnection.query('DELETE FROM Users WHERE Users.UserID = ?;', [req.params.id], (error, results, fields) => {
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