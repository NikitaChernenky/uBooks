import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admins {
  UserID: number;
  Name: string;
  Surname: string;
  Email: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with admin data. */
export class AdminsService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all admin's data. */
  getAllAdmins(): Observable<Admins[]> {
    return this.http.get<Admins[]>('http://localhost:3000/admins/');
  }

  /* Load data by admin's id. */
  getAdminByID(id: number): Observable<Admins> {
    return this.http.get<Admins>('http://localhost:3000/admins/' + id);
  }

  /* Writing data to the users table with admin role. */
  insertAdmin(user: Admins): Observable<Admins> {
    return this.http.post<Admins>('http://localhost:3000/admins/create', user);
  }

  /* Updating table data. */
  updateAdmin(user: Admins): Observable<void> {
    return this.http.put<void>('http://localhost:3000/admins/update/', user);
  }

  /* Delete table data. */
  deleteAdmin(id: number) {
    return this.http.delete('http://localhost:3000/admins/delete/' + id);
  }
}
