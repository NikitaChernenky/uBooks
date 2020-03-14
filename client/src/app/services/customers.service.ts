import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customers {
  UserID: number;
  Name: string;
  Surname: string;
  Email: string;
  Password: string;
  CountryID: number;
  PhoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with customers data. */
export class CustomersService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all customers data. */
  getAllCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>('/customers/');
  }

  /* Load data by customer id. */
  getCustomerByID(id: number): Observable<Customers> {
    return this.http.get<Customers>('/customers/' + id);
  }

  /* Writing data to a table. */
  insertCustomer(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>('/customers/create', customer);
  }

  /* Updating table data. */
  updateCustomer(customer: Customers): Observable<void> {
    return this.http.put<void>('/customers/update/', customer);
  }

  /* Delete table data. */
  deleteCustomer(id: number) {
    return this.http.delete('/customers/delete/' + id);
  }
}
