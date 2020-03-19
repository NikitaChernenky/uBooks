/* Import all modules, libraries and services. */
import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/services/admins.service';
import { CustomersService } from 'src/app/services/customers.service';
import { AuthService } from 'src/app/services/auth.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.css']
})

/* Module view using class. */
export class AdminAdminsComponent implements OnInit {

  /* Declaration of all variables. */
  admins: any = [];
  customers: any = [];
  data: any = {};
  changingData: any = {};
  visibleForm: string = '';

  /* Using services. */
  constructor(private adminsService: AdminsService, private customersService: CustomersService, private authService: AuthService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
  }

  /* Load data to variable using admin users service. */
  fetchData() {
    /* Load all data to variable using admins' service. */
    this.adminsService.getAllAdmins().subscribe(admin => {
      this.admins = admin;
    },
      err => {
        console.log(err);
      });

    /* Load all data to variable using customers' service. */
    this.customersService.getAllCustomers().subscribe(customer => {
      this.customers = customer;
    },
      err => {
        console.log(err);
      });
  }

  /* Reset create form after button clicking. */
  resetCreateForm() {
    this.data = {};
  }

  /* Reset update form after button clicking. */
  resetUpdateForm() {
    this.changingData = {};
  }

  /* Create a new admin using service. Writing data to the table of database. */
  createAdmin() {
    /* Checking if data properties is not empty and email address validation */
    if (this.data.Name && this.data.Surname && this.validateEmail(this.data.Email) && this.data.Password) {
      /* Checking if there are some users with the same email address. */
      if (!this.admins.find(admin => admin.Email == this.data.Email) && !this.customers.find(customer => customer.Email == this.data.Email)) {
        /* Add new data to the table of HTML-page. */
        let adminid = this.admins[this.admins.length - 1].UserID + 1;
        if (this.customers.find(customer => customer.UserID == adminid)) {
          adminid = this.customers[this.customers.length - 1].UserID + 1;;
        }
        let adminuser = {
          UserID: adminid,
          Name: this.data.Name,
          Surname: this.data.Surname,
          Email: this.data.Email,
          Password: this.data.Password
        };
        this.admins.push(adminuser);
        this.authService.setSignedUpUser(adminuser);
        /* INSERT query to the admins' table of the database */
        this.adminsService.insertAdmin(this.data).subscribe(() => { this.fetchData(); });
        /* Hide adding form. */
        this.visibleForm = '';
      } else {
        alert('User with this email exists!'); this.visibleForm = '';
      }
    } else {
      alert('Please, fill in all fields or change your email address!'); this.visibleForm = '';
    }
  }

  /* Update admin user data using a service. */
  updateAdmin() {
    /* Checking if data properties is not empty and if email address validation */
    if (this.validateEmail(this.changingData.Email) && this.changingData.Password && this.changingData.Name && this.changingData.Surname) {
      /* Checking if there are some users with the same email address. */
      if (!this.admins.find(admin => admin.Email == this.changingData.Email && admin.UserID != this.changingData.UserID) && !this.customers.find(customer => customer.Email == this.changingData.Email)) {
        /* UPDATE query to the admins' table of the database */
        this.adminsService.updateAdmin(this.changingData).subscribe(() => { this.fetchData(); });
        /* Update admin's data. */
        for (var i = 0; i < this.admins.length; i++) {
          if (this.changingData.UserID == this.admins[i].UserID) {
            this.admins[i].Name = this.changingData.Name;
            this.admins[i].Surname = this.changingData.Surname;
            this.admins[i].Email = this.changingData.Email;
            this.admins[i].Password = this.changingData.Password;
          }
        }
        /* Hide updating form. */
        this.visibleForm = '';
      } else {
        alert('User with this email exists!'); this.visibleForm = '';
      }
    } else {
      alert('Input fields must not be empty or incorrect!'); this.visibleForm = '';
    }
  }

  /* Get data from form for updating user's data. */
  getAdminForUpdate(id) {
    /* Get admin by ID from the database. */
    this.adminsService.getAdminByID(id).subscribe(admin => {
      this.changingData.UserID = admin[0].UserID;
      this.changingData.Name = admin[0].Name;
      this.changingData.Surname = admin[0].Surname;
      this.changingData.Email = admin[0].Email;
      this.changingData.Password = admin[0].Password;
    },
      err => {
        console.log(err);
      });
  }

  /* Remove selected admin from the table of database. */
  deleteAdmin(id) {
    /* DELETE query to the admins table of the database */
    this.adminsService.deleteAdmin(id).subscribe(() => { this.fetchData(); });
    /* Delete table entry by admin ID. */
    this.admins = this.admins.filter(admin => admin.UserID != id);
  }

  /* Email address validation. */
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
