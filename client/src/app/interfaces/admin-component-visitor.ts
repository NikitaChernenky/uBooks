/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

Visitor Design Pattern - Part 2
*/

import { Visitor } from '@angular/compiler/src/i18n/i18n_ast';
import { AdminBookGenresComponent } from '../admin/admin-book-genres/admin-book-genres.component';
import { AdminBooksComponent } from '../admin/admin-books/admin-books.component';
import { AdminCustomersComponent } from '../admin/admin-customers/admin-customers.component';
import { AdminCountriesComponent } from '../admin/admin-countries/admin-countries.component';
import { AdminHeaderComponent } from '../admin/admin-header/admin-header.component';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { AdminAdminsComponent } from '../admin/admin-admins/admin-admins.component';

export class AdminComponentVisitor {
     item:  any;
    router: any;
     VisitPage(item: any) {
        if (this.item instanceof AdminBookGenresComponent) {
            this.router.navigate(["/admin/book-genres"]);
        }
        else if (this.item instanceof AdminBooksComponent) {
            this.router.navigate(["/admin/books"]);
        }
        else if (this.item instanceof AdminCountriesComponent) {
            this.router.navigate(["/admin/countries"]);
        }
        else if (this.item instanceof AdminCustomersComponent) {
            this.router.navigate(["/admin/customers"]);
        }
        else if (this.item instanceof AdminHeaderComponent) {
            this.router.navigate(["/admin/header"]);
        }
        else if (this.item instanceof AdminOrdersComponent) {
            this.router.navigate(["/admin/orders"]);
        }
        else if  (this.item instanceof AdminAdminsComponent) {
            this.router.navigate(["/admin/admins"]);
        };
    }
}
