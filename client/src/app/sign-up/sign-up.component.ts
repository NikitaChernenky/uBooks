/* Import all modules, libraries and services. */
import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../services/admins.service';
import { CustomersService } from '../services/customers.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CountriesService } from '../services/countries.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

/* Module view using class. */
export class SignUpComponent implements OnInit {

  /* Declaration of all variables. */
  countries: any = [];
  customers: any = [];
  admins: any = [];
  data: any = {};

  /* Using services. */
  constructor(private countriesService: CountriesService, private adminsService: AdminsService, private customersService: CustomersService, private router: Router, private authService: AuthService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
    /* Reset drop-down list with countries. */
    this.data.CountryID = 'none';
  }

  /* Load data using services. */
  fetchData() {
    /* Load data to variable using countries service. */
    this.countriesService.getAllCountries().subscribe(country => {
      this.countries = country;
    },
      err => {
        console.log(err);
      });

    /* Load data to variable using admins service. */
    this.adminsService.getAllAdmins().subscribe(user => {
      this.admins = user;
    },
      err => {
        console.log(err);
      });

    /* Load data to variable using customers service. */
    this.customersService.getAllCustomers().subscribe(user => {
      this.customers = user;
    },
      err => {
        console.log(err);
      });
  }

  /* Creating a new customer account (Sign up). Writing data to the database table. */
  createCustomer() {
    /* Checking if data properties is not empty and email address validation. */
    if (this.data.CountryID != 'none' && this.data.Name && this.data.Surname && this.data.PhoneNumber && this.validateEmail(this.data.Email) && this.data.Password) {
      /* Checking if there are some users with the same email address. */
      if (!this.customers.find(user => user.Email == this.data.Email) && !this.admins.find(user => user.Email == this.data.Email)) {
        let customerid = this.customers[this.customers.length - 1].UserID + 1;
        if (this.admins.find(admin => admin.UserID == customerid)) {
          customerid = this.admins[this.admins.length - 1].UserID + 1;
        }
        this.data.UserID = customerid;
        /* Using authService to add signed up user. */
        this.authService.setSignedUpUser(this.data);
        /* INSERT query to the customers' table of the database */
        this.customersService.insertCustomer(this.data).subscribe(() => { this.fetchData(); });
        /* Open sign-in page. */
        this.router.navigate(['/sign-in']);
      } else {
        alert('Input or select fields must not be empty or incorrect!');
      }
    } else {
      alert('User with this email is already signed up!');
    }
  }

  /* Email address validation. */
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
