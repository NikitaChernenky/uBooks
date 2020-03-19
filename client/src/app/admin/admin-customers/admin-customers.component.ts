/* Import all modules, libraries and services. */
import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { CountriesService } from 'src/app/services/countries.service';
import { AdminsService } from 'src/app/services/admins.service';
import { AuthService } from 'src/app/services/auth.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})

/* Module view using class. */
export class AdminCustomersComponent implements OnInit {

  /* Declaration of all variables. */
  customers: any = [];
  admins: any = [];
  countries: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = '';

  /* Using services. */
  constructor(private customersService: CustomersService, private countriesService: CountriesService, private adminsService: AdminsService, private authService: AuthService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
    /* Reset drop-down list with countries. */
    this.data.CountryID = 'none';
  }

  /* Load data to variable using customer and countries services. */
  fetchData() {
    /* Load all data to variable using customers' service. */
    this.customersService.getAllCustomers().subscribe(customer => {
      this.customers = customer;
    },
      err => {
        console.log(err);
      });

    /* Load all data to variable using countries' service. */
    this.countriesService.getAllCountries().subscribe(country => {
      this.countries = country;
    },
      err => {
        console.log(err);
      });

    /* Load all data to variable using admins' service. */
    this.adminsService.getAllAdmins().subscribe(admin => {
      this.admins = admin;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
    this.data.CountryID = 'none';
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new customer using service. Writing data to the table of database. */
  createCustomer() {
    /* Checking if data properties is not empty */
    if (this.data.Name && this.data.Surname && this.validateEmail(this.data.Email) && this.data.Password && this.data.CountryID != 'none' && this.data.PhoneNumber) {
      /* Checking if there are some users with the same email address. */
      if (!this.customers.find(customer => customer.Email == this.data.Email && customer.UserID != this.data.UserID) && !this.admins.find(admin => admin.Email == this.data.Email)) {
        /* Add new data to the table of HTML-page. */
        let customerid = this.customers[this.customers.length - 1].UserID + 1;
        if (this.admins.find(admin => admin.UserID == customerid)) {
          customerid = this.admins[this.admins.length - 1].UserID + 1;
        }
        let customer = {
          UserID: customerid,
          Name: this.data.Name,
          Surname: this.data.Surname,
          Email: this.data.Email,
          Password: this.data.Password,
          CountryID: this.data.CountryID,
          CountryName: this.countries.find(country => country.CountryID == this.data.CountryID).CountryName,
          CountryCode: this.countries.find(country => country.CountryID == this.data.CountryID).CountryCode,
          PhoneNumber: this.data.PhoneNumber,
          CardNumber: this.data.CardNumber
        }
        this.customers.push(customer);
        this.authService.setSignedUpUser(this.data);
        /* INSERT query to the customers' table of the database */
        this.customersService.insertCustomer(customer).subscribe(() => { this.fetchData(); });
        /* Hide adding form. */
        this.visibleForm = '';
      } else {
        alert('User with this email exists!'); this.visibleForm = '';
      }
    } else {
      alert('Please, fill in all fields or change email address!'); this.visibleForm = '';
    }
  }

  /* Update customer data using a service. */
  updateCustomer() {
    /* Checking if data properties is not empty and email address validation. */
    if (this.validateEmail(this.changingData.Email) && this.changingData.Password && this.changingData.Name && this.changingData.Surname && this.changingData.CountryID != 'none' && this.changingData.PhoneNumber) {
      /* Checking if there are some customers with the same email. */
      if (!this.customers.find(customer => customer.Email == this.data.Email && customer.UserID != this.data.UserID) && !this.admins.find(admin => admin.Email == this.data.Email)) {
        /* UPDATE query to the customers' table of the database */
        this.customersService.updateCustomer(this.changingData).subscribe(() => { this.fetchData(); });
        /* Update data of customer. */
        this.customers.find(customer => {
          if (customer.UserID == this.changingData.UserID) {
            customer.Name = this.changingData.Name;
            customer.Surname = this.changingData.Surname;
            customer.Email = this.changingData.Email;
            customer.Password = this.changingData.Password;
            customer.CountryID = this.changingData.CountryID;
            customer.CountryName = this.countries.find(country => country.CountryID == this.changingData.CountryID).CountryName;
            customer.CountryCode = this.countries.find(country => country.CountryID == this.changingData.CountryID).CountryCode;
            customer.PhoneNumber = this.changingData.PhoneNumber;
            customer.CardNumber = this.changingData.CardNumber;
          }
        });
        /* Hide adding form. */
        this.visibleForm = '';
      } else {
        alert('User with this email exists!'); this.visibleForm = '';
      }
    } else {
      alert('Input fields must not be empty or incorrect!'); this.visibleForm = '';
    }
  }

  /* Get data from form for updating customer's data. */
  getCustomerForUpdate(id) {
    /* Get customer by ID from the database. */
    this.customersService.getCustomerByID(id).subscribe(customer => {
      this.changingData.UserID = customer[0].UserID;
      this.changingData.Name = customer[0].Name;
      this.changingData.Surname = customer[0].Surname;
      this.changingData.Email = customer[0].Email;
      this.changingData.Password = customer[0].Password;
      this.changingData.CountryID = customer[0].CountryID;
      this.changingData.PhoneNumber = customer[0].PhoneNumber;
      this.changingData.CardNumber = customer[0].CardNumber;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected admin from the table of database. */
  deleteCustomer(id) {
    /* DELETE query to the customers' table of the database */
    this.customersService.deleteCustomer(id).subscribe(() => { this.fetchData(); });
    /* Delete table entry by customer's ID. */
    this.customers = this.customers.filter(customer => customer.UserID != id);
  }

  /* Email address validation. */
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
