/* Import all modules, libraries and services. */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminAdminsComponent } from './admin/admin-admins/admin-admins.component';
import { AdminBookGenresComponent } from './admin/admin-book-genres/admin-book-genres.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { AdminCountriesComponent } from './admin/admin-countries/admin-countries.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CustomerAccountComponent } from './customer/customer-account/customer-account.component';
import { CustomerCartComponent } from './customer/customer-cart/customer-cart.component';
import { CustomerBooksComponent } from './customer/customer-books/customer-books.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { CustomerMyBooksComponent } from './customer/customer-my-books/customer-my-books.component';

/* Definition of routes for each component. */
const routes: Routes = [
  /* Routes for admin's pages. */
  { path: 'admin/admins', component: AdminAdminsComponent },
  { path: 'admin/book-genres', component: AdminBookGenresComponent },
  { path: 'admin/books', component: AdminBooksComponent },
  { path: 'admin/countries', component: AdminCountriesComponent },
  { path: 'admin/customers', component: AdminCustomersComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  /* Routes for customer's pages. */
  { path: 'customer/account', component: CustomerAccountComponent },
  { path: 'customer/cart', component: CustomerCartComponent },
  { path: 'customer/books', component: CustomerBooksComponent },
  { path: 'customer/mybooks', component: CustomerMyBooksComponent },
  { path: 'customer/orders', component: CustomerOrdersComponent },
  /* Routes for Sign-in and Sign-up pages. */
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  /* Routes for undefined pages. */
  { path: '', redirectTo: 'sign-in', pathMatch:'full' },
  { path: '**', component: NotFoundComponent }
];

/* Decorator function NgModule.*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

/* Module view using class. */
export class AppRoutingModule { }
