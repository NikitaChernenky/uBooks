/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[Home] Sign Up Page - TypeScript
 */
/* Import all modules, libraries and services. */
import { Component, OnInit, Renderer2 } from "@angular/core";
import { AdminsService } from "../services/admins.service";
import { CustomersService } from "../services/customers.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CountriesService } from "../services/countries.service";

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})

/* Module view using class. */
export class SignUpComponent implements OnInit {
  /* Declaration of all variables. */
  countries: any = [];
  customers: any = [];
  admins: any = [];
  data: any = {};

  //validation flags
  incorrectName = false;
  incorrectPassword = false;
  incorrectEmail = false;
  incorrectCountry = false;
  incorrectPhoneNumber = false;

  /* Using services. */
  constructor(
    private countriesService: CountriesService,
    private adminsService: AdminsService,
    private customersService: CustomersService,
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.renderer.setStyle(document.body, 'background', 'linear-gradient(to right, #fc4a1a, #f7b733)'); //apply background for the entire component
  }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
    /* Reset all fields. */
    this.data.CountryID = "none";
    this.data.Name = "";
    this.data.Surname = "";
    this.data.PhoneNumber = "";
    this.data.Email = "";
    this.data.Password = "";
  }

  /* Load data using services. */
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

  /* Creating a new customer account (Sign up). Writing data to the database table. */
  createCustomer() {
    /* Checking if data properties is not empty and email address validation. */
    this.resetValidationFlags();
    //validate name: if first or last name incorrect -> throw validation error
    if (!this.validateName(this.data.Name)) {
      //validate first name
      this.incorrectName = true;
    }
    if (!this.validateName(this.data.Surname)) {
      //validate last name
      this.incorrectName = true;
    }
    /* Check flags */
    if (this.data.CountryID == "none") { 
      this.incorrectCountry = true;
    }
    if (!this.validatePhoneNumber(this.data.PhoneNumber)) {
      this.incorrectPhoneNumber = true;
    }
    if (!this.validateEmail(this.data.Email)) {
      this.incorrectEmail = true;
    }
    if (!this.validatePassword(this.data.Password)) {
      this.incorrectPassword = true;
    }
    if (
      this.incorrectName == false &&
      this.incorrectCountry == false &&
      this.incorrectPhoneNumber == false &&
      this.incorrectEmail == false &&
      this.incorrectPassword == false
    ) {
      /* Checking if there are some users with the same email address. */
      if (
        !this.customers.find(user => user.Email == this.data.Email) &&
        !this.admins.find(user => user.Email == this.data.Email)
      ) {
        let customerid = this.customers[this.customers.length - 1].UserID + 1;
        if (this.admins.find(admin => admin.UserID == customerid)) {
          customerid = this.admins[this.admins.length - 1].UserID + 1;
        }
        this.data.UserID = customerid;
        /* Using authService to add signed up user. */
        this.authService.setSignedUpUser(this.data);
        /* INSERT query to the customers' table of the database */
        this.customersService.insertCustomer(this.data).subscribe(() => {
          this.fetchData();
        });
        /* Open sign-in page. */
        this.router.navigate(["/sign-in"]);
      } else {
        alert("User with this email is already signed up!");
      }
    } else {
      alert("Incorrect Input!");
    }
  }

  /* Email address validation regular expression */
  validateEmail(email) {
    var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(String(email).toLowerCase());
  }

  validatePassword(password) { //password validatitor
    var passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //regular expression for password
    return passwordRegEx.test(String(password));
  }

  validateName(name) { //name validation regular expression 
    console.log("here");
    var nameRegEx = /[a-zA-z]{1,30}/; //name has to be at least 1 character long and less than 30 characters long
    return nameRegEx.test(String(name));
  }

  validatePhoneNumber(phoneNumber) { //phone nu,ber validation regular expression
    var phoneRegEx = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/; //matches various phone number entry formats
    return phoneRegEx.test(String(phoneNumber));
  }

  resetValidationFlags() { //reset wrong input flags
    this.incorrectName = false;
    this.incorrectPassword = false;
    this.incorrectEmail = false;
    this.incorrectCountry = false;
    this.incorrectPhoneNumber = false;
  }
}
