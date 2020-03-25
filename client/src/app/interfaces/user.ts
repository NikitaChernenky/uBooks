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
