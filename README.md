# uBooks
uBooks
3.7: Change Password - Activity Diagram
3.3.5 Administrator Use Case Description & Diagram
Shown in Figure 3.8 is the Administrator use case diagram. Since the administrator
is capable of doing everything, the diagram is fairly complex. As a result, the diagram has
many use cases that describe what the administrator can do. All use cases have dependency
with each other and thus are grouped accordingly. The administrator’s use cases are divided
in the following five components: Mange Admins, Manage Book Catalog, Manage Account,
Manage Genres and Manage Customers.
The first use case group, Manage Admins extends the following three use cases: Add new
admin, Delete admin and Update admin information.
The second use case group is Manage Book Catalog which has three extends: Add new
book, Delete book and Update book information.
The third use case group is Manage Account which has two extends: Update User information
and Change password.
The fourth group of use cases is Manage Genres. It has the following three extends: Add
new genre, Delete genre and Update Genre.
The fifth and the last use case group is Manage Customers. This group has the following
3 extends: Add new customer, Delete Customer and Update customer information.
19
Figure 3.8: Administrator Use Case Diagram
20
Figure 3.9: Admin Adds a New Book For Sale - Use Case Description
Figure 3.10: Admin Adds a New Book For Sale - Activity Diagram
21
Figure 3.11: Admin Deletes an Existing Book - Use Case Description
Figure 3.12: Admin Deletes an Existing Book - Activity Diagram
22
Figure 3.13: Add a New Admin - Use Case Description
Figure 3.14: Add a New Admin - Activity Diagram
23
Figure 3.15: Add a New Book Genre - Use Case Description
Figure 3.16: Add a New Book Genre - Activity Diagram
24
Figure 3.17: Add a New Customer - Use Case Description
Figure 3.18: Add a New Customer - Activity Diagram
25
3.3.6 Buyer Use Case Description & Diagram
Shown in Figure 3.19 is the Buyer use case diagram. The diagram displays the actions
that can be performed by the buyer. Note that in this example, the Buyer implements
the abstract actor User. Most use cases have dependency with each other. Below is the explanation
of all use cases and their dependency with each other.
The first use case group is Browse Book Catalogue which has two extends: Perform
advanced search and vView book details. The Perform Advanced Search is a cluster
and consists of the following three use cases: Set price range, Filter by genre and Sort by
price (Min/Max). The next use case is Place Order which includes Manage Shopping
Cart. The reason these two use cases have the ’include’ relationship is because the buyer must
first be in the Cart page to place an order. Manage Shopping Cart has 2 extends: Remove
a book from the cart and Add a book to the cart. Once the book is added to the cart,
the buyer is able to edit quantity. Finally, Check Order Status is extended from View
History of Orders. This is because the buyer must be in the orders history page to view the
status of his/her orders.
Figure 3.19: Buyer Use Case Diagram
26
3.3.7 Buyer Use Case Description
Figure 3.20: Add a Book To The Cart - Use Case Description
Figure 3.21: Add a Book To The Cart - Activity Diagram
27
Figure 3.22: Place Order - Use Case Description
Figure 3.23: Place Order - Activity Diagram
28
3.3.8 Seller Use Case Description & Diagram
Shown in Figure 3.24 is the seller use case diagram. The diagram displays the use
cases that are executed by the seller. As we have previously mentioned, The seller implements
the abstract actor User. This is the simplest use case diagram that involves a concrete actor.
However, it’s main use case is by far the most complicated. This is because it involves two
validation checks: one for log in and another for the credit card. Below is the use case description
and the activity diagram.
The one and only use case group is Manage books for sale which has two extends: Remove
a book and Add a new book for sale. Once seller has added a new book for sale, he/she
can edit quantity of the added book.
Figure 3.24: Seller Use Case Diagram
Figure 3.25: Seller Adds a New Book For Sale - use Case Description
29
Figure 3.26: Seller Adds a New Book For Sale - Activity Diagram
3.4 Software qualities
We will be focusing on the software qualities correctness, time-efficiency, robustness
and user friendliness. First, uBooks must have the correctness software quality because the
user wants the service to work as expected. Second, uBooks must have the time-efficient quality
because it is a very important factor of the application. It takes seconds to sign up and/or
sign in. In addition, our search function rapidly produces results and our service is available
24/7, unlike our competitor the BuyBack Program. Third, uBooks must be Robust because
High Performance is our most important software quality. If the Performance of uBooks is
unstable and/or unresponsive, then correctness and user friendliness are negatively impacted.
Last, uBooks must have user friendliness because of the need for simplicity, cleanliness and
intuitive. For example, the uBooks Search function is simpler to use compared our competitors:
Facebook groups and BuyBack program.
Here is the list of software qualities:
1. Correctness: The ability of software to perform their exact tasks, as defined by their
specification.
(a) Usability: Usability refers to the quality of a user’s experience when interacting
with software.
 Users of all technological skill levels are able to utilize this web application
 The Search function allows the user to search a book by genre, author, title
and/or price range
30
 The design is Memorable to provide ease of navigation
 Only Users who have registered can access the system
(b) Reliability: An unreliable product is not user-friendly, since it will cause undue
frustration for the user. uBooks is a user-friendly product is reliable and does not
malfunction or crash. (TechTerms)
 Error messages and warnings must be concise, clear and unambiguous
 The final product will be well tested ensure the Reliability and Maintainability
 Every week, we will check on uBooks to update/maintain our web application,
all the while monitoring it daily to ensure its reliability
 uBooks will work under any environment so long as the user has access to the
internet
 If a new book is added with a typo, the user can update the book’s information
immediately
 Only administrators can create other administrators
2. Time-Efficiency: How well the software system handles capacity, throughput, and
response time. (RequirementsQuest)
(a) Availability: The ratio of time a system or component is functional to the total
time it is required or expected to function. (WhatIs.com)
 Our service/product is required to be available 24/7
 uBooks is more available than our competitor, specifically the BuyBack Program.
 Availability goes hand in hand with Reliability, because as Reliability increases,
so does Availability
 If a user updates (for example) some profile information, the system shall ensure
that other users shall automatically see the update within seconds
(b) Throughput: The ability to process a large volume of transactions within a certain
time frame. (TechTarget)
 uBooks can contain and display the information of 1000+ books for sale
 uBooks can continue to operate properly with up to about 500 users/visitors
at any given moment
3. Robustness: The degree to which uBooks continues to function in the presence of
invalid inputs or stressful environmental conditions (Steve McConnell)
(a) Reliability:
 Error messages and warnings must be concise, clear and unambiguous
 uBooks is Extensible due to having a flexible architectural design to cater to
future changes
 If a user enters incorrect values on the sign in page or an unauthorized user
tries to access the system, the system will not crash
 A User will be unable to add a new book until all required informative fields
are filled
(b) High Performance: How uBooks performs in terms of responsiveness and stability
under a particular workload.
31
 The speed of the Search function on the Buy Books page is rapid
 High Performance goes hand in hand with robustness, correctness and user
friendliness, because if High Performance decreases, so do the others
 As mentioned above, uBooks has a positive throughput
4. User Friendliness: User-friendly describes a hardware device or software interface that
is easy to use
(a) Simplicity: uBooks is a user-friendly interface is not overly complex. It is straightforward,
providing quick access to common features or commands. (TechTerms)
 Text is clear, visible and coloured accordingly
 Specifically, compared to our competition, our search function provides the
Simplicity that our competitors do not have for buying textbooks
 Our customers are able to search for books depending on title, author, genre
and price range
 Signing up is a short task
(b) Cleanliness: uBooks has a good UI is well-organized, making it easy/clean to
locate different tools and options. (TechTerms)
 Positive Customer Experience is present due to the visual flow of the UI
 Fashionable, simplistic and uncluttered design of UI
(c) Intuitive: In order for uBooks to be user-friendly, an interface must make sense
to the average user and should require minimal explanation for how to use it.
(TechTerms)
 Customers of all technological skills can utilize our web application with ease
 Buttons show that they are clickable by being coloured, labeled and/or universally
recognizable
 Anyone can sign up
 All field names are meaningful
32
4. Top-Level and Low-Level Design
4.1 MVC Software Architecture
4.1.1 How MVC Works
To start, Model, View, and Controller separates uBooks into 3 components. To
explain, I will be quoting from Teacher Tutorials: "
Model: Model represents shape of the data and business logic. It maintains the data of the
application. Model objects retrieve and store model state in a database. Model is data and
business logic
View: View: View is a user interface. View display data using model to the user and also
enables them to modify the data. View is User Interface.
Controller: Controller: Controller handles the user request. Typically, user interact with
View, which in-turn raises appropriate URL request, this request will be handled by a controller.
The controller renders the appropriate view with the model data as a response. Controller
is a request handler." (TeacherTutorials).
As you can see on Figure 4.1, the user will enter the URL into the browser, send
the request to the controller. The controller will then render the view and the view will send
a request to the controller. The view will display the model while the controller manipulates
the model. A response is then sent back to browser. Note that AngularJS is an MVC based
framework.
Figure 4.1: How MVC Works
Referencing Figure 4.2, "In general cases there is only one way of data binding in
other framework but AngularJS provides two-way data binding it’s continuous updates views
and models data vice versa." (AmarInfotech)."The model is responsible for managing application
data. It responds to the request from view and to the instructions from controller to
update itself" (tutorialspoint). "A presentation/view of data in a particular format is triggered
by the controller’s decision to present the data" (tutorialspoint). "They are script-based
template systems such as JSP, ASP, PHP and very easy to integrate with AJAX technology"
(tutorialspoint). "The controller responds to user input and performs interactions on the
33
data model objects. The controller receives input, validates it, and then performs business
operations that modify the state of the data model" (tutorialspoint).
Figure 4.2: MVC Close Up
4.1.2 What uBooks Needs
 uBooks needs to hide the complexity of the system to our end users
 uBooks needs to be a system developed with high cohesion and loose coupling to support
the software qualities correctness, robustness and reliability
 uBooks needs to immediately reflect the changes made by a user without having to
refresh the page (ex. One user adds a new book and the other user must be able to see
it immediately in Buy Books)
4.1.3 Why We Chose MVC
Due to the needs above, there are many reasons on why we used the Model, View and
Controller (MVC) architecture. The MVC provides an architectural design that is distinctive
in behaviour, appearance and state because:
 Of the scalability possibilities in large, medium and small projects
 There is less loading time: AngularJS reduces loading time compared to jQuery
 MVC has the ability to analyze the Document Object Model (DOM) and it binds based on
the element attributes and JavaScript and jQuery use inner HTML for it (AmarInfoTech)
 File organization is made easy. "Routing is very easy and effective in AngularJS and
file organization is done using routing so file organization is very easy in AngularJS"
(AmarInfotech).
 The MVC promotes flexibility and reusability
 The complexity of the system is hidden to the end user since they only interact with the
"View" Component of the MVC
34
 The MVC provides consistency in the system
 the MVC promoted decoupled code
4.2 Design Patterns
Observer Pattern
The first design pattern we would like to discuss is the behavioural Observer design
pattern. "Observer design pattern is used when there is one-to-many relationship between
objects such as if one object is modified, its dependent objects are to be notified automatically
" (tutorialspoint). As displayed in Figure 4.3, Subject represents the core abstraction
while the Observer represents the variable abstraction. "The Subject prompts the Observer objects
to do their thing. Each Observer can call back to the Subject as needed " (tutorialspoint).
Observer pattern is an optimal solution for a situation in which the subject must
constantly keep the objects updated with the new information. This pattern is a huge improvement
from doing singular updates from one dependency to the other. Moreover, the pattern
facilitates loosely coupling design.
In our situation specifically, this design pattern helps us maintain one-to-many . Our
Subject (Administrator) observes the Observer and the Observer Objects (Seller and Buyer).
In addition, the Administrator implements the Subject. The main reason we used this pattern
is because the MVC frameworks also use Observer pattern where Model is the Subject and
Views are observers that can register to get notified of any change to the model.
A good example of how the Observer Pattern works in our application is the following: If the
administrator(subject) adds a new book for sale, the customer(observer) will be able to see
the book in the catalogue without having to refresh the page. This technique is also called
reactive programming.
Figure 4.3: Observer Design Pattern
35
4.2.1 Observer Design Pattern - Subject
4.2.1.1 Subject.ts
/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks
[OBSERVER DESIGN PATTERN] Subject - TypeScript
*/
//Observer Design Pattern - SUBJECT
import { AdminsService } from ’../services/admins.service’;
import { CountriesService } from ’../services/countries.service’;
import { CustomersService } from ’../services/customers.service’;
export class Subject {
customers: any;
data: any;
admins: any;
authService: any;
router: any;
countries: any;
constructor(
private countriesService: CountriesService,
private adminsService: AdminsService,
private customersService: CustomersService
) {}
addCustomer() {
/* Checking if there are some users with the same email address. */
let customerid = this.customers[this.customers.length - 1].UserID + 1;
if (this.admins.find(admin => admin.UserID == customerid)) {
customerid = this.admins[this.admins.length - 1].UserID + 1;
}
this.data.UserID = customerid;
/* Using authService to add signed up user. */
this.authService.setSignedUpUser(this.data);
/* INSERT query to the customers’ table of the database */
this.customersService.insertCustomer(this.data).subscribe(() => {
this.fetchData();
});
}
deleteCustomer(id: number) {
/* DELETE query to the customers’ table of the database */
this.customersService.deleteCustomer(id).subscribe(() => { this.fetchData(); });
/* Delete table entry by customer’s ID. */
this.customers = this.customers.filter(customer => customer.UserID != id);
36
}
fetchData() {
/* Load data to variable using countries service. */
this.countriesService.getAllCountries().subscribe(
country => {
this.countries = country;
},
err => {
console.log(err);
}
);
/* Load data to variable using admins service. */
this.adminsService.getAllAdmins().subscribe(
user => {
this.admins = user;
},
err => {
console.log(err);
}
);
/* Load data to variable using customers service. */
this.customersService.getAllCustomers().subscribe(
user => {
this.customers = user;
},
err => {
console.log(err);
}
);
}
}
Listing 4.1: Subject implementation
37
Prototype Pattern
The second design pattern we would like to discuss is the creational Prototype pattern.
"The Prototype pattern refers to creating a duplicate object while keeping performance in mind. This
type of design pattern provides one of the best ways to create an object. It also involves implementing
a prototype interface which tells to create a clone of the current object and is used when creation of
object directly is costly " (tutorialspoint). As displayed in Figure 4.4, the Abstract Class User extends
to the User Class Customer. The reasons we used the prototype pattern is because "Prototype
allows us to hide the complexity of making new instances from the client. The concept is to copy an
existing object rather than creating a new instance from scratch, something that may include costly
operations. The existing object acts as a prototype and contains the state of the object. The newly
copied object may change same properties only if required. This approach saves costly resources and
time, especially when the object creation is a heavy process " (GeeksForGeeks).
Using this pattern we can easily create a new Customer object using the attributes of the user object.
This technique makes our code reusable and more qualitative.
Figure 4.4: Prototype Design Pattern
4.2.2 Prototype Design Pattern - Part 1
4.2.2.1 user.ts
/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks
User class
*/
//PROTOTYPE Design Pattern Part 1
export class User { //User class that will be cloned
constructor(
private login: string,
private password: string,
private country: string,
private creditCard: string,
38
private phoneNumber: string
) {}
Set( //function used to set values for the user
login1: string,
password1: string,
country1: string,
creditCard1: string,
phoneNumber1: string
) {
this.login = login1;
this.password = password1;
this.country = country1;
this.creditCard = creditCard1;
this.phoneNumber = phoneNumber1;
}
}
Listing 4.2: Prototype Design Pattern - Part 1
4.2.3 Prototype Design Pattern - Part 2
4.2.3.1 customer.ts
/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks
Customer class
*/
//PROTOTYPE Design Patter - Part 2
import { User } from "./user"; //import user class
class Customer { //initiate customer class
constructor(customerID: number, user: User) {} //2 parameters: customerID, and User
object
create( //create Customer function
customerID: number,
login: string,
password: string,
country: string,
creditCard: string,
phoneNumber: string
) {
var customer = new Customer(customerID, new User(login, password, country,
creditCard, phoneNumber)); //created new Customer by cloning User
}
}
Listing 4.3: Prototype Design Pattern - Part 2
39
Visitor Pattern
The final design pattern we would like to discuss is the behavioural Visitor design pattern.
Referencing Figure 4.5, Visitor uses the Element AdminComponent which leads to all the Concrete
Elements such as Admin-admins-component and admin-book-genres-component. The accept method
within each of them calls the correct implementation based on the visitor passed, so it is the admin who
tells if the countries component or the orders component is needed. Looking back at the Visitor, it also
uses the Concrete Visitor called AdminComponentVistor and within it is all the concrete elements.
The main reasons we used this pattern is for loose coupling and so future changes should not impact
the system. To summarize, the Visitor pattern lets us define a new operation (such as the book genres
component) in uBooks without changing the classes of the elements on which it operates (the admin
component).
Figure 4.5: Visitor Design Pattern
4.2.4 Visitor Design Pattern - Part 2
4.2.4.1 admin-component-visitor.ts
/* Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks
Visitor Design Pattern - Part 2
*/
import { Visitor } from ’@angular/compiler/src/i18n/i18n_ast’;
import { AdminBookGenresComponent } from ’../admin/admin-book-genres/admin-bookgenres.
component’;
import { AdminBooksComponent } from ’../admin/admin-books/admin-books.component’;
import { AdminCustomersComponent } from ’../admin/admin-customers/admin-customers.
component’;
import { AdminCountriesComponent } from ’../admin/admin-countries/admin-countries.
component’;
import { AdminHeaderComponent } from ’../admin/admin-header/admin-header.component’;
import { AdminOrdersComponent } from ’../admin/admin-orders/admin-orders.component’;
import { AdminAdminsComponent } from ’../admin/admin-admins/admin-admins.component’;
export class AdminComponentVisitor {
40
item: any;
router: any;
VisitPage(item: any) {
if (this.item instanceof AdminBookGenresComponent) {
this.router.navigate(["/admin/book-genres"]);
}
else if (this.item instanceof AdminBooksComponent) {
this.router.navigate(["/admin/books"]);
}
else if (this.item instanceof AdminCountriesComponent) {
this.router.navigate(["/admin/countries"]);
}
else if (this.item instanceof AdminCustomersComponent) {
this.router.navigate(["/admin/customers"]);
}
else if (this.item instanceof AdminHeaderComponent) {
this.router.navigate(["/admin/header"]);
}
else if (this.item instanceof AdminOrdersComponent) {
this.router.navigate(["/admin/orders"]);
}
else if (this.item instanceof AdminAdminsComponent) {
this.router.navigate(["/admin/admins"]);
};
}
}
Listing 4.4: Admin Component Visitor
4.2.5 Visitor Design Pattern - Part 1
4.2.5.1 visitor.ts
/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks
Visitor Design Pattern - Part 1
*/
import { AdminComponentVisitor } from ’./admin-component-visitor’;
export interface Visitor {
visit(item: AdminComponentVisitor);
}
Listing 4.5: visitor.ts
41
4.3 Class Diagrams
Due to high complexity of our project, the class diagram is very large. Also, since the
application is done in Angular, the diagram consists of many services and components. I have successfully
incorporated the design patterns with all other components of the project. Figure 4.6 shows
the cropped out part with the design patters.
Figure 4.6: Design Patterns Within The Class Diagram
In the overall class diagram, I have highlighted the design patterns in different colours.
This way I can easily see where they are located and how they interact with the rest of the project
components.
1. Yellow Circle: Visitor Design Pattern 4.5
2. Blue Circle: Observable Design Pattern 4.3
3. Purple Circle: Prototype Design Pattern 4.4
42
4.3.1 Overall Class Diagram
Figure 4.7: Overall Class diagram
43
5. Programs
5.1 Component Diagram
Component Server Diagrams
The first component diagram we will discuss is the Server Component Diagram, referencing
Figure 5.1. This diagram depicts how our server part is set up. Server.js contains the logic to connect
to real-time database ClearDB. As you can see on the diagram, it uses logic of express.js as an external
package, which is also apart of our developer stack. The Server component also contains the routes.
To add, there are different routes responsible for different components of the application. Each one of
these routes connects to a table in the real time database and can modify it.
Figure 5.1: Component Server Diagram
44
Component Client Diagram
The other component diagram we will discuss is the Component Client Diagram, referencing
Figure 5.2. This is the client side of our application. As we have mentioned before, there can be 2
types of users: Admin or Customer. There are admin classes that implement admin components.
Admin components include the operations that can be done on the admin side. Such as, modify book
catalogue, modify and manage orders, and so on. The customer component has the same functionality.
With any angular application, we start off with index.html component that is then referred to router
which decides where to go based on URL.
Figure 5.2: Component Client Diagram
45
5.2 Deployment Diagram
Here is our Deployment Diagram which relates to the MEAN stack architecture, referencing
Figure 5.3. On the left side, you can see the client component stack. This layer controls what the
user can see on the client side. The client layer connects to the business layer via HTTP/IP request.
The business layer connects to the actual database layer which is of a real-time database ClearDB via
HTTP/IP request. The business layer also connects to the Heroku Environment which is our host via
HTTP/IP. The host is implemented by node.js and Heroku CLI. Note that any modern and up to
date web browser can support our software.
Figure 5.3: Deployment Diagram
46
5.3 Data Model
Figure 5.4: Data Model
5.4 Tables of Contents of the System Data
List of Tables:
1. Table Contents of Books: Reference Figure 5.5
2. Table Contents of Countries: Reference Figure 5.6
3. Table Contents of Customers: Reference Figure 5.7
4. Table Contents of Genres: Reference Figure 5.8
5. Table Contents of Orders: Reference Figure 5.9
6. Table Contents of Users: Reference Figure 5.10
5.5 Link to the web application
Here is the link to our web application https://u-books-angular.herokuapp.com/
47
Figure 5.5: Table Contents of Books
Figure 5.6: Table Contents of Countries
48
Figure 5.7: Table Contents of Customers
49
Figure 5.8: Table Contents of Genres
50
Figure 5.9: Table Contents of Orders
51
Figure 5.10: Table Contents of Users
52
6. Technical Documentation
6.1 List of Programming Languages
6.1.0.1 Programming Languages
 TypeScript
 Shell Script
 Git Bash
6.1.0.2 Structured Query Languages
 MySQL
6.1.0.3 Mark-up languages
 HTML
 CSS
6.2 List of reused algorithms and programs
 We have watched various YouTube tutorials for web application development, with the most
useful being Angular - Node - MongoDB & Express (MEAN) Tutorial for Beginners - Getting
Started [https://www.geeksforgeeks.org/prototype-design-pattern/]
Using this resource, we were to teach ourselves how to build a three-tier web application that
connects to the real-time database.
One of the big challenges was getting our application to run on the actual hosting server.
We have read numerous tutorial to figure out which hosting is the most suitable for our application.
We have concluded that Heroku is the most suitable hosting for our application
since it’s free and supports the real-time database. To successfully deploy the web application
on Heroku, we have followed the following tutorial: https://scotch.io/tutorials/
how-to-deploy-a-node-js-app-to-heroku.
53
6.3 List of software tools and environments:
 IDE: Visual Studio Code
 Hosting: Heroku
 SQL Development: MySQL Workbench
 Repository Hosting GitHub
 Git Command Line: Git Bash/VSCode Terminal
 UML Diagrams: Draw.io/Visual Paradigm
 Development Package Managers: Cocoa Pods/NPM
 Testing: Google Chrome
 Cloud Database: ClearDB
 Server Runtime Environment: NodeJS
We have developed our web application using Angular framework. Angular is an open
source TypeScript based web app development framework. Angular eases the process of the application
development. It provides you with multiple tools that provide quick view and quick routing. You can
control the view based on the back-end data easily. It is a handy resource for utilizing HTML templates
and assembling data services for applications.
Angular is a great framework for web development. The benefits of using Angular include
but are not limited to: cross platform development, speed, performance and/or productivity. Because
we used Angular, we were able to implement the MVC Architecture and enhanced our design architecture.
In addition, Angular includes TypeScript which fully complies to JavaScript, has good tooling,
clean code and high scalability. TypeScript also helps to spot and eliminate common mistakes while
coding.
In order to develop a three-tier application we needed to decide which developer stack must
be used. After hours of researching, we have concluded that MEAN stack is the most suitable stack
for our web application. MEAN developer stack consists of the following four components:
 M: MySQL ClearDB/ MongoDB (Real-Time Database)
 E: ExpressJS (Back-End Web Framework)
 A: Angular (Front-End Framework)
 N: NodeJS (Back-End Runtime Environment)
As shown in Figure 6.2, MEAN architecture consists of three tiers: Client Tier, Business
Logic Tier and the Database Tier.
1) The client tier sends an HTTP request to the Business Logic Tier
2) The HTTP request is then handled by the NodeJS which then requests data from the database tier
3) The data request is then handled by the Database Server Clear DB which then sends the data
back to ExpressJS (Business Logic Tier)
4) The ExpressJS will then send the data back to the client.
54
Figure 6.1: MEAN Developer Stack
Figure 6.2: MEAN Stack Architecture
55
7. Acceptance Testing
Functional testing is also known as the black box test by the fact of treating software as a
box whose content is unknown and which we can only see the outside. For example, with the supplied
input data, the responses are produced as output. Functional testing involves two steps: identify the
functions that the software must perform and then create test cases that are able to check if these
functions are performed by the software. In this there are 5 functional test cases, one input and one
output screenshot each.
7.1 Functional Testing
Case 1 - User: Sign Up
Table 7.1: Functional Testing Table 1
Input User’s name, surname, country, phone number, email address and password
Output Successful Sign Up
Software uBooks (https://u-books-angular.herokuapp.com/)
Flow of events
1. Go to https://u-books-angular.herokuapp.com/
2. Click Create an Account (Go to https://u-booksangular.
herokuapp.com/#/sign-up)
3. Enter valid sign up credentials
4. Click the ’Sign Up’ button
5. The user account has been successfully created and the user is redirected
to the ’sign in’ page
Screenshots Figures 7.1 and 7.2
56
Figure 7.1: Functional Case 1 Input
Figure 7.2: Functional Case 1 Output
57
Case 2 - User: Sign In
Table 7.2: Functional Testing Table 2
Input Valid email address and password of an existing user account
Output Successful sign in
Software uBooks (https://u-books-angular.herokuapp.com/)
Flow of events
1. https://u-books-angular.herokuapp.com/
2. Enter valid sign in credentials
3. Click the ’Sign In’ button
4. The user account has been successfully signed in and the user is redirected
to the ’Buy books’ page
Screenshots Figures 7.3 and 7.4
Figure 7.3: Functional Case 2 Input
58
Figure 7.4: Functional Case 2 Output
Case 3 - User: Add Book to Cart
Table 7.3: Functional Testing Table 3
Input Highlighted ’Add to Cart’ button is clicked
Output Book has successfully been added to cart as shown on ’Cart’ page
Software uBooks (https://u-books-angular.herokuapp.com/)
Flow of events Assuming User is Signed In:
1. Go to https://u-books-angular.herokuapp.com/#/customer/books
2. Search for a book
3. Click the highlighted add to cart button
4. Go to ’Cart’ page (Go to https://u-booksangular.
herokuapp.com/#/customer/cart) to see item in Cart
Screenshots Figures 7.5 and 7.6
59
Figure 7.5: Functional Case 3 Input
Figure 7.6: Functional Case 3 Output
60
Case 4 - User: Checkout
Table 7.4: Functional Testing Table 4
Input Highlighted ’Checkout’ button is clicked
Output Checkout successful
Software uBooks (https://u-books-angular.herokuapp.com/)
Flow of events Assuming User is Signed In:
1. Go to ’Cart’ page (Go to https://u-booksangular.
herokuapp.com/#/customer/cart)
2. Ensure order is correct
3. Click ’Checkout’ button
4. Popup indicates that order is completed and pending. Also, the cart
is now empty.
Screenshots Figures 7.7 and 7.8
Figure 7.7: Functional Case 4 Input
61
Figure 7.8: Functional Case 4 Output
Case 5 - User: Delete Book from Cart
Table 7.5: Functional Testing Table 5
Input Highlighted ’Delete’ button is clicked
Output Cart is now empty
Software uBooks (https://u-books-angular.herokuapp.com/)
Flow of events Assuming User is Signed In and a book has been added to cart:
1. Go to ’Cart’ page (Go to https://u-booksangular.
herokuapp.com/#/customer/cart)
2. Click ’Delete’ button on unwanted book
3. ’Cart’ page displays ’Shopping cart is empty!’
Screenshots Figures 7.9 and 7.10
62
Figure 7.9: Functional Case 5 Input
Figure 7.10: Functional Case 5 Output
