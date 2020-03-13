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
    return this.http.get<Orders[]>('http://localhost:3000/orders/');
  }

  /* Load data by order id. */
  getOrderByID(id: number): Observable<Orders> {
    return this.http.get<Orders>('http://localhost:3000/orders/' + id);
  }

  /* Load full orders data by customer id. */
  getFullOrderInfoByCustomerID(id: number): Observable<Orders> {
    return this.http.get<Orders>('http://localhost:3000/orders/full/order/' + id);
  }

  /* Load full orders data. */
  getFullOrdersInfo(): Observable<Orders> {
    return this.http.get<Orders>('http://localhost:3000/orders/full/orders');
  }

  /* Writing data to a table. */
  insertOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>('http://localhost:3000/orders/create', order);
  }

  /* Updating order status by order id. */
  updateStatus(status: Object): Observable<void> {
    return this.http.put<void>('http://localhost:3000/orders/update/status', status);
  }
}
