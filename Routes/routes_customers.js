const express = require('express'); // Include Express module.
const routes = express.Router();
const mySqlConnection = require('./connection');

routes.post('/create', (req, res) => { // Create a new customer in the database. Using Stored Procedure.
    let customer = req.body;
    //console.log(customer);
    
    mySqlConnection.query('INSERT INTO Users (`UserID`, `Name`, `Surname`, `Email`, `Password`, `AdminRole`) VALUES (?, ?, ?, ?, ?, 0);', [customer.UserID, customer.Name, customer.Surname, customer.Email, customer.Password]);
    
    mySqlConnection.query('INSERT INTO Customers (`UserID`, `CountryID`, `PhoneNumber`, `CardNumber`) VALUES (?, ?, ?, ?);', [customer.UserID, customer.CountryID, customer.PhoneNumber, customer.CardNumber]);
});


routes.get('/', (req, res) => { // Get all customers from the database.
    mySqlConnection.query('SELECT Users.UserID, Users.Name, Users.Surname, Users.Email, Users.Password, Countries.CountryID, Countries.CountryName, Countries.CountryCode, Customers.PhoneNumber, Customers.CardNumber, Users.AdminRole FROM Users INNER JOIN Customers ON Users.UserID = Customers.UserID INNER JOIN Countries ON Customers.CountryID = Countries.CountryID WHERE Users.AdminRole = 0;', (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.get('/:id', (req, res) => { // Get customer by ID from the database.
    mySqlConnection.query('SELECT Users.UserID, Users.Name, Users.Surname, Users.Email, Users.Password, Countries.CountryID, Countries.CountryName, Countries.CountryCode, Customers.PhoneNumber, Customers.CardNumber, Users.AdminRole FROM Users INNER JOIN Customers ON Users.UserID = Customers.UserID INNER JOIN Countries ON Customers.CountryID = Countries.CountryID WHERE Users.UserID = ?;', [req.params.id], (error, results, fields) => {
        if (!error) {
            res.send(results);
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.put('/update', (req, res) => { // Update customer by ID in the database.
    let customer = req.body;
    mySqlConnection.query('UPDATE Users SET Users.Name = ?, Users.Surname = ?, Users.Email = ?, Users.Password = ? WHERE UserID = ?; UPDATE Customers SET Customers.CountryID = ?, Customers.PhoneNumber = ?, Customers.CardNumber = ? WHERE Customers.UserID = ?;', [customer.Name, customer.Surname, customer.Email, customer.Password, customer.UserID, customer.CountryID, customer.PhoneNumber, customer.CardNumber, customer.UserID], (error, results, fields) => {
        if (!error) {
            res.send('Updated successfully!');
        } else {
            return res.status(400).send({
                message: error
            });
        }
    });
});

routes.delete('/delete/:id', (req, res) => { // Delete customer by ID from the database. The Users table has a cascading relationship with the Customers table.
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