/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[Service] Auth
This service was made to accomplish correct authorization process
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/* Service for obtaining info about an authorized user. */
export class AuthService {

  /* Declaration of all variables. */
  signedInUser: any = {};
  signedUpUser: any = {};

  constructor() { }

  /* Write to variable authorized user data. */
  setSignedInUser(user) {
    this.signedInUser = user;
  }

  /* Get authorized user data. */
  getSignedInUser() {
    return this.signedInUser;
  }

  /* User's data record to variable. */
  setSignedUpUser(user) {
    this.signedUpUser = user;
  }

  /* Get user's data. */
  getSignedUpUser() {
    return this.signedUpUser;
  }
}
