/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

Admin Order Management Tool - TypeScript
*/

/* Import all modules, libraries and services. */
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})

/* Module view using class. */
export class AdminOrdersComponent implements OnInit {

  /* Declaration of all variables. */
  orders: any = [];
  visibleForm: string = "";

  /* Using services. */
  constructor(private ordersService: OrdersService) { }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
  }

  /* Load data to variable using services. */
  fetchData() {
    /* Load all data to variable using orders' service. */
    this.ordersService.getFullOrdersInfo().subscribe(order => {
      this.orders = order;
      /* Group customer's orders by OrderID using groupBy function. */
      this.orders = this.groupBy(this.orders, "OrderID");
      /* Calculating the total price of each order of the customer. */
      for (let order of this.orders) {
        let totalprice = (order.reduce(function (prev, cur) { return prev + cur.TotalPrice; }, 0)).toFixed(2);
        order.forEach(book => { book.TotalPrice = totalprice; });
      }
    },
      err => {
        console.log(err);
      });
  }

  /* Group customer's orders array by OrderID. */
  groupBy(collection, property) {
    let i = 0, val, index, values = [], result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1)
        result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  /* Confirm the order afted button clicking. */
  confirmOrder(id) {
    /* UPDATE query of order's status to the orders table of the database. */
    this.ordersService.updateStatus({ OrderStatus: "confirmed", OrderID: id }).subscribe(() => { this.fetchData(); });
    /* Change order status by order ID. */
    for (let i = 0; i < this.orders.length; i++) {
      if (id == this.orders[i][0].OrderID) {
        this.orders[i][0].OrderStatus = "confirmed";
      }
    }
  }

  /* Reject the order afted button clicking. */
  rejectOrder(id) {
    /* UPDATE query of order's status to the orders table of the database. */
    this.ordersService.updateStatus({ OrderStatus: "rejected", OrderID: id }).subscribe(() => { this.fetchData(); });
    /* Change order status by order ID. */
    for (let i = 0; i < this.orders.length; i++) {
      if (id == this.orders[i][0].OrderID) {
        this.orders[i][0].OrderStatus = "rejected";
      }
    }
  }
}
