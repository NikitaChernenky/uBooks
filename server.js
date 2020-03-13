/* Include modules. */

const express = require("express");
const path = require('path');
const app = express();
//const mySqlConnection = require("./Routes/connection");

// Serve only the static files form the dist directory (in which angular precompiled files should appears after server launch on heroku)
//app.use(express.static(__dirname + '/dist/front-end_angular'));


const cors = require("cors");
const bodyParser = require("body-parser");

/* Loading route modules. */

const booksRoutes = require("./Routes/routes_books");
const ordersRoutes = require("./Routes/routes_orders");
const customersRoutes = require("./Routes/routes_customers");
const countriesRoutes = require("./Routes/routes_countries");
const adminUsersRoutes = require("./Routes/routes_admin_users");
const bookGenresRoutes = require("./Routes/routes_book_genres");

/* Using included modules. */

app.use(cors());

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

/* Add catalog routes to middleware chain. */

app.use("/books", booksRoutes);
app.use("/orders", ordersRoutes);
app.use("/customers", customersRoutes);
app.use("/countries", countriesRoutes);
app.use("/admins", adminUsersRoutes);
app.use("/bookgenres", bookGenresRoutes);

//mySqlConnection.destroy();


app.use(express.static('client/dist/book-store'));
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname));
})

/* App listening on port. */

/*
app.listen(3000, function () {
	console.log('API app started on localhost:3000!');
});

*/

app.listen(process.env.PORT || 8080); // launch server on heroku with its own port
