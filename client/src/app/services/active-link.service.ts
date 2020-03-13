import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/* Service for obtaining info about active link of the navigation bar. */
export class ActiveLinkService {

  /* Declaration of all variables. */
  activecustomer: string = 'books';
  activeadmin: string = 'admins';

  constructor() { }

  /* Get an active link from customer's page. */
  getCustomerActiveLink() {
    return this.activecustomer;
  }

  /* Set an active link from customer's page. */
  setCustomerActiveLink(link) {
    if (link == 'books') {
      this.activecustomer = 'books';
    }
    if (link == 'cart') {
      this.activecustomer = 'cart';
    }
    if (link == 'mybooks') {
      this.activecustomer = 'mybooks';
    }
    if (link == 'orders') {
      this.activecustomer = 'orders';
    }
    if (link == 'account') {
      this.activecustomer = 'account';
    }
  }

  /* Get an active link from admin's page. */
  getAdminActiveLink() {
    return this.activeadmin;
  }

  /* Set an active link from admin's page. */
  setAdminActiveLink(link) {
    if (link == 'admins') {
      this.activeadmin = 'admins';
    }
    if (link == 'customers') {
      this.activeadmin = 'customers';
    }
    if (link == 'countries') {
      this.activeadmin = 'countries';
    }
    if (link == 'book-genres') {
      this.activeadmin = 'book-genres';
    }
    if (link == 'books') {
      this.activeadmin = 'books';
    }
    if (link == 'orders') {
      this.activeadmin = 'orders';
    }
  }
}
