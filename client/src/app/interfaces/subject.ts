/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[OBSERVER DESIGN PATTERN] Subject - TypeScript
 */

//Observer Design Pattern - SUBJECT

import { AdminsService } from '../services/admins.service';
import { CountriesService } from '../services/countries.service';
import { CustomersService } from '../services/customers.service';


export class Subject {
    customers: any;
    data: any;
    admins: any;
    authService: any;
    router: any;
    countries: import("c:/Users/new pc/Downloads/Telegram Desktop/u-books-angular/client/src/app/services/countries.service").Countries[];
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
            /* INSERT query to the customers' table of the database */
            this.customersService.insertCustomer(this.data).subscribe(() => {
              this.fetchData();
            });
          }  
    deleteCustomer(id: number) {
         /* DELETE query to the customers' table of the database */
    this.customersService.deleteCustomer(id).subscribe(() => { this.fetchData(); });
    /* Delete table entry by customer's ID. */
    this.customers = this.customers.filter(customer => customer.UserID != id);
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
