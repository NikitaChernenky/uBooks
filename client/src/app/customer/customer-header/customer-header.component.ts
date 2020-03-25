/* 
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[Customer] Header  -  TypeScript
*/

/* Import all libraries and services. */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActiveLinkService } from 'src/app/services/active-link.service';
import { ThrowStmt } from '@angular/compiler';
import { CartService } from 'src/app/services/cart.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})

/* Module view using class. */
export class CustomerHeaderComponent implements OnInit {

  /* Declaration of all variables. */
  currentUser: any = {};
  active: string = '';
  @Input() cartquantity: number = 0;

  /* Using services. */
  constructor(private authService: AuthService, private activeLinkService: ActiveLinkService, private router: Router, private cartService: CartService) {
    this.currentUser = this.authService.getSignedInUser();
    this.active = this.activeLinkService.getCustomerActiveLink();
    this.cartquantity = this.cartService.getQuantity();
  }

  /* Perform component initialization. */
  ngOnInit() {
    if ((Object.entries(this.currentUser).length === 0 && this.currentUser.constructor === Object)) {
      this.router.navigate(['/sign-in']); // if user value is not stired in session then redirect back to sign in page
    }
  }

  /* User's sign out after session. */
  signOut() {
    this.currentUser = {};
    this.authService.setSignedInUser({});
  }

  /* Set active link of navbar after click event. */
  setActiveLink(linkname) {
    this.activeLinkService.setCustomerActiveLink(linkname);
    this.active = this.activeLinkService.getCustomerActiveLink();
  }
}
