/* 
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[Customer] Manage Account Tool -  TypeScript
*/
/* Import all libraries and services. */
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { CountriesService } from "src/app/services/countries.service";
import { Router } from "@angular/router";
import { CustomersService } from "src/app/services/customers.service";
import { AdminsService } from "src/app/services/admins.service";
import { ActiveLinkService } from "src/app/services/active-link.service";

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: "app-customer-account",
  templateUrl: "./customer-account.component.html",
  styleUrls: ["./customer-account.component.css"]
})

/* Module view using class. */
export class CustomerAccountComponent implements OnInit {
  /* Declaration of all variables. */
  saved: boolean = false;
  customers: any = [];
  admins: any = [];
  countries: any = [];
  changingData: any = {};

  /* Using services. */
  constructor(
    private authService: AuthService,
    private customersService: CustomersService,
    private adminsService: AdminsService,
    private countriesService: CountriesService,
    private router: Router,
    private activeLinkService: ActiveLinkService
  ) {}

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
    this.saved = false;
  }

  /* Load data to variable using counties service. Fetch data functions call. */
  fetchData() {
    /* Load all data to variable using countries service. */
    this.countriesService.getAllCountries().subscribe(
      country => {
        this.countries = country;
      },
      err => {
        console.log(err);
      }
    );

    /* Load all data to variable using customers' service. */
    this.customersService.getAllCustomers().subscribe(
      customer => {
        this.customers = customer;
      },
      err => {
        console.log(err);
      }
    );

    /* Load all data to variable using admins' service. */
    this.adminsService.getAllAdmins().subscribe(
      admin => {
        this.admins = admin;
      },
      err => {
        console.log(err);
      }
    );

    /* Load  data of customer to variable after sign-in using AuthService. */
    this.changingData = this.authService.getSignedInUser();
  }

  /* Update customer's data using the service. */
  updateCustomer() {
    /* Checking if data properties is not empty and email address validation */
    if (
      this.changingData.Name &&
      this.changingData.Surname &&
      this.changingData.CountryID != "none" &&
      this.changingData.PhoneNumber &&
      this.validateEmail(this.changingData.Email) &&
      this.changingData.Password
    ) {
      /* Checking if there are some users with the same email address. */
      if (
        !this.customers.find(
          user =>
            user.Email == this.changingData.Email &&
            user.UserID != this.changingData.UserID
        ) &&
        !this.admins.find(
          user =>
            user.Email == this.changingData.Email &&
            user.UserID != this.changingData.UserID
        )
      ) {
        /* UPDATE query to the customers' table of the database */
        this.customersService
          .updateCustomer(this.changingData)
          .subscribe(() => {
            this.fetchData();
          });
        /* Show saved changes window. */
        this.saved = true;
      } else {
        alert("User with this email is already signed up!");
      }
    } else {
      alert("Input or select fields must not be empty or incorrect!");
    }
  }

  /* Undo changes. */
  undoChanges() {
    this.router.navigate(["/customer/books"]);
  }

  /* Set active link of navbar after click event. */
  setActiveLink(linkname) {
    this.activeLinkService.setCustomerActiveLink(linkname);
  }

  /* Email address validation. */
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
