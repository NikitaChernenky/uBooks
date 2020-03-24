/* Import all libraries and services. */
import { Component, OnInit, Renderer2 } from "@angular/core";
import { AdminsService } from "../services/admins.service";
import { CustomersService } from "../services/customers.service";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})

/* Module view using class. */
export class SignInComponent implements OnInit {
  /* Declaration of all variables. */
  data: any = {};
  admins: any = [];
  customers: any = [];

    //validation flags
    incorrectPassword = false;
    incorrectEmail = false;
 

  /* Using services. */
  constructor(
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
  }

  /* Load data using services. */
  fetchData() {
    /* Load data to variable using admins service. */
    this.adminsService.getAllAdmins().subscribe(
      users => {
        this.admins = users;
      },
      err => {
        console.log(err);
      }
    );

    /* Load data to variable using customers service. */
    this.customersService.getAllCustomers().subscribe(
      users => {
        this.customers = users;
      },
      err => {
        console.log(err);
      }
    );
  }

  /* Get user type (admin role) by email adress and password. */
  getUserByEmailPassword(arr, email, password) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].Email == email && arr[i].Password == password) {
        this.authService.setSignedInUser(arr[i]);
        return arr[i].AdminRole;
      }
    }
    return false;
  }

  /* Sign in to the system. */
  signInUser() {
    this.resetValidationFlags();
    if (!this.validateEmail(this.data.Email)) {
      this.incorrectEmail = true;
    }
    if (!this.validatePassword(this.data.Password)) {
      this.incorrectPassword = true;
    }
    /* Checking if data properties is not empty and email address validation. */
    if (this.incorrectEmail == false && this.incorrectPassword == false ) {
      /* Getting a signed-up user. */
      let obj = this.authService.getSignedUpUser();
      /* If signed-up user is not empty, add him to customers' array. */
      if (!(Object.entries(obj).length === 0 && obj.constructor === Object)) {
        this.customers.push(obj);
      }
      /* Open admin account if user has an admin role. Open customer account if user has not an admin role. */
      if (
        this.getUserByEmailPassword(
          this.admins,
          this.data.Email,
          this.data.Password
        ) === 1
      ) {
        this.router.navigate(["/admin/admins"]);
      } else if (
        this.getUserByEmailPassword(
          this.customers,
          this.data.Email,
          this.data.Password
        ) === 0
      ) {
        this.router.navigate(["/customer/books"]);
      } else {
        alert("User does not exist");
      }
    } else {
      alert("Input fields are empty or incorrect");
    }
  }

  /* Email address validation. */
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password) { //password validatitor
    var passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //regular expression for password
    return passwordRegEx.test(String(password));
  }

  resetValidationFlags() {
    this.incorrectPassword = false;
    this.incorrectEmail = false;
  }
}
