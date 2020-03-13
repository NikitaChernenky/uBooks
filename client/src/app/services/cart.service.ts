import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/* Service for obtaining order. */
export class CartService {

  /* Declaration of all variables. */
  cartproducts: any = [];

  constructor() { }

  /* Add books' data to cart. */
  setBooks(book) {
    if (typeof this.cartproducts[this.cartproducts.indexOf(book)] === 'undefined')
      this.cartproducts.push(book);
  }

  /* Write to variable ordered books. */
  getBooks() {
    return this.cartproducts;
  }

  getQuantity() {
    return this.cartproducts.length;
  }

  /* Reset customer's cart. */
  resetCart() {
    this.cartproducts.length = 0;
  }
}
