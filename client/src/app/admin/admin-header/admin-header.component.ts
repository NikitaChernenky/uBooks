/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

Admin Dashboard Page Header - TypeScript
*/

/* Import all libraries and services. */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActiveLinkService } from 'src/app/services/active-link.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})

/* Module view using class. */
export class AdminHeaderComponent implements OnInit {

  /* Declaration of all variables. */
  currentUser: any = {};
  active: string = '';

  /* Using services. */
  constructor(private authService: AuthService, private activeLinkService: ActiveLinkService, private router: Router) {
    this.currentUser = this.authService.getSignedInUser();
    this.active = this.activeLinkService.getAdminActiveLink();
  }

  /* Perform component initialization. */
  ngOnInit() {
    /* Check if user is signed in. */
    if ((Object.entries(this.currentUser).length === 0 && this.currentUser.constructor === Object)) {
      this.router.navigate(['/sign-in']);
    }
  }

  /* User's sign out after session. */
  signOut() {
    this.currentUser = {};
    this.authService.setSignedInUser({});
  }

  /* Set active link of navbar after click event. */
  setActiveLink(linkname) {
    this.activeLinkService.setAdminActiveLink(linkname);
    this.active = this.activeLinkService.getAdminActiveLink();
  }
}
