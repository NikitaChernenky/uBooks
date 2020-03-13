const mysql = require('mysql'); // Include MySQL module.

const mySqlConnection = mysql.createPool(process.env.CLEARDB_DATABASE_URL || { // Create the connection variable with the required details.
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'bbefdf4f69e6f9',
    password: '483fda5c',
    database: 'heroku_95b55225a0d78df',
    multipleStatements: true
});

/*
mySqlConnection.connect((error) => { // Database connection.
    if (!error) {
        console.log('The connection to the database is successful!');
    } else {
        console.log('Failed to connect to the database. \n Error: ' + JSON.stringify(error, undefined, 2));
    }
});
*/

module.exports = mySqlConnection;
