/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks
*/

//PROTOTYPE Design Patter - Part 2
import { User } from "./user"; //import user class

class Customer { //initiate customer class
  constructor(customerID: number, user: User) {} //2 parameters: customerID, and User object
  create(               //create Customer function
    customerID: number,
    login: string,
    password: string,
    country: string,
    creditCard: string,
    phoneNumber: string
  ) {
    var customer = new Customer(customerID, new User(login, password, country, creditCard, phoneNumber)); //created new Customer by cloning User
  }
}
