/* Import all modules, libraries and services. */
import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActiveLinkService } from 'src/app/services/active-link.service';

/* Using the @Component decorator to make a class a component. */
@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})

/* Module view using class. */
export class CustomerCartComponent implements OnInit {

  /* Declaration of all variables. */
  data: any = [];
  books: any = [];
  orders: any = [];
  alltotalprice: number = 0;
  cartquantity: number;

  /* Using services. */
  constructor(private booksService: BooksService, private cartService: CartService, private ordersService: OrdersService, private authService: AuthService, private activeLinkService: ActiveLinkService) {
    this.data = this.cartService.getBooks();
    this.cartquantity = this.cartService.getQuantity();
  }

  /* Perform component initialization. */
  ngOnInit() {
    this.fetchData();
  }

  /* Load data to variable using services. */
  fetchData() {
    /* Load all data to variable using books' service. */
    this.booksService.getAllBooks().subscribe(book => {
      for (let i = 0; i < book.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          if (book[i].BookID == this.data[j]) {
            this.books.push(book[i]);
            this.books[this.books.length - 1].BookQuantityToBuy = 1;
            this.alltotalprice += book[i].Price * this.books[this.books.length - 1].BookQuantityToBuy;
          }
        }
      }
    },
      err => {
        console.log(err);
      });
    this.ordersService.getAllOrders().subscribe(order => {
      this.orders = order;
    },
      err => {
        console.log(err);
      });
  }

  /* Checkout the order. */
  getOrder() {
    /* Get max value of order ID from Orders table. */
    let orderID = Math.max.apply(Math, this.orders.map(function (order) { return order.OrderID; })) + 1;
    /* Get current date. */
    let date = (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate() + " " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();
    /* INSERT query to the orders' table of the database */
    for (let i = 0; i < this.books.length; i++) {
      this.ordersService.insertOrder({
        OrderID: orderID,
        UserID: this.authService.getSignedInUser().UserID,
        BookID: this.books[i].BookID,
        Quantity: this.books[i].BookQuantityToBuy,
        OrderDate: date,
        OrderStatus: "expected"
      }).subscribe(() => { this.fetchData(); });
    }
    /* Reset all values of variables. */
    this.alltotalprice = 0;
    this.data.length = 0;
    this.orders.length = 0;
    this.books.length = 0;
    this.cartService.resetCart();
    this.cartquantity = 0;
  }

  /* Delete book from the cart. */
  deleteBookFromCart(id) {
    this.cartquantity--;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].BookID == id) {
        this.alltotalprice -= this.books[i].Price * this.books[i].BookQuantityToBuy;
        this.books.splice(i, 1);
        this.data.splice(this.data.indexOf(id), 1);
      }
    }
  }

  /* Plus book's quantity. */
  plusQuantity(id) {
    if (this.books.find(book => book.BookID == id).BookQuantityToBuy < this.books.find(book => book.BookID == id).Quantity) {
      this.books.find(book => book.BookID == id).BookQuantityToBuy++;
      this.alltotalprice += this.books.find(book => book.BookID == id).Price;
    }
  }

  /* Minus book's quantity. */
  minusQuantity(id) {
    if (this.books.find(book => book.BookID == id).BookQuantityToBuy > 1) {
      this.books.find(book => book.BookID == id).BookQuantityToBuy--;
      this.alltotalprice -= this.books.find(book => book.BookID == id).Price;
    }
  }

  /* Set active link of navbar after click event. */
  setActiveLink(linkname) {
    this.activeLinkService.setCustomerActiveLink(linkname);
  }
}
