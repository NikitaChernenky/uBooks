/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[Service] Orders
This service was made to perform various operations with Orders table
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Orders {
  OrderID: number;
  UserID: number;
  BookID: number;
  Quantity: number;
  OrderDate: string;
  OrderStatus: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with orders data. */
export class OrdersService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all orders data. */
  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>('/orders/');
  }

  /* Load data by order id. */
  getOrderByID(id: number): Observable<Orders> {
    return this.http.get<Orders>('/orders/' + id);
  }

  /* Load full orders data by customer id. */
  getFullOrderInfoByCustomerID(id: number): Observable<Orders> {
    return this.http.get<Orders>('/orders/full/order/' + id);
  }

  /* Load full orders data. */
  getFullOrdersInfo(): Observable<Orders> {
    return this.http.get<Orders>('/orders/full/orders');
  }

  /* Writing data to a table. */
  insertOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>('/orders/create', order);
  }

  /* Updating order status by order id. */
  updateStatus(status: Object): Observable<void> {
    return this.http.put<void>('/orders/update/status', status);
  }
}
