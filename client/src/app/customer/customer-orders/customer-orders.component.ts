/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[Customer] Orders Page  -  TypeScript
 */

/* Import all modules, libraries and services. */
import { Component, OnInit } from "@angular/core";
import { OrdersService } from "src/app/services/orders.service";
import { AuthService } from "src/app/services/auth.service";

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: "app-customer-orders",
  templateUrl: "./customer-orders.component.html",
  styleUrls: ["./customer-orders.component.css"]
})

/* Module view using class. */
export class CustomerOrdersComponent implements OnInit {
  /* Declaration of variable. */
  orders: any = [];

  /* Using service. */
  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
  }

  /* Load data to variable using services. */
  fetchData() {
    /* Load all data to variable using orders' service. */
    this.ordersService
      .getFullOrderInfoByCustomerID(this.authService.getSignedInUser().UserID)
      .subscribe(
        order => {
          this.orders = order;
          /* Group customer's orders by OrderID using groupBy function. */
          this.orders = this.groupBy(this.orders, "OrderID");
          /* Calculating total price for each order of the customer. */
          for (let order of this.orders) {
            let totalprice = order
              .reduce(function(prev, cur) {
                return prev + cur.TotalPrice;
              }, 0)
              .toFixed(2);
            order.forEach(book => {
              book.TotalPrice = totalprice;
            });
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  /* Group customer's orders array by OrderID. */
  groupBy(collection, property) {
    let i = 0,
      val,
      index,
      values = [],
      result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }
}
