/* Import all modules, libraries and services. */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { CustomerHeaderComponent } from './customer/customer-header/customer-header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminCountriesComponent } from './admin/admin-countries/admin-countries.component';
import { AdminBookGenresComponent } from './admin/admin-book-genres/admin-book-genres.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminCustomersComponent } from './admin//admin-customers/admin-customers.component';
import { AdminAdminsComponent } from './admin/admin-admins/admin-admins.component';
import { AuthService } from './services/auth.service';
import { AdminsService } from './services/admins.service';
import { BookGenresService } from './services/book-genres.service';
import { BooksService } from './services/books.service';
import { CountriesService } from './services/countries.service';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { CartService } from './services/cart.service';
import { ActiveLinkService } from './services/active-link.service';
import { CustomerAccountComponent } from './customer/customer-account/customer-account.component';
import { CustomerOrdersComponent } from './customer/customer-orders/customer-orders.component';
import { CustomerBooksComponent } from './customer/customer-books/customer-books.component';
import { CustomerCartComponent } from './customer/customer-cart/customer-cart.component';
import { CustomerMyBooksComponent } from './customer/customer-my-books/customer-my-books.component';

/* Decorator function NgModule.*/
@NgModule({
  /* View classes that belong to the module. */
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    CustomerHeaderComponent,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent,
    AdminCountriesComponent,
    AdminBookGenresComponent,
    AdminBooksComponent,
    AdminOrdersComponent,
    AdminCustomersComponent,
    AdminAdminsComponent,
    CustomerAccountComponent,
    CustomerOrdersComponent,
    CustomerBooksComponent,
    CustomerCartComponent,
    CustomerMyBooksComponent
  ],
  /* Other modules whose classes are required for component templates from the current module. */
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  /* Classes that create services used by the module. */
  providers: [
    AuthService,
    AdminsService,
    BookGenresService,
    BooksService,
    CountriesService,
    CustomersService,
    OrdersService,
    CartService,
    ActiveLinkService
  ],
  /* The root component that is called by default when the application loads. */
  bootstrap: [AppComponent]
})

/* Module view using class. */
export class AppModule { }
