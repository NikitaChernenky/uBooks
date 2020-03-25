/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[Service] Books 
This service was made to perform various operations with Books
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Books {
  BookID: number;
  UserID: number;
  ISBN: string;
  BookCover: string;
  BookTitle: string;
  BookAuthor: string;
  BookGenreID: number;
  PublicationYear: number;
  BookOverview: string;
  Price: number;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with books data. */
export class BooksService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all books data. */
  getAllBooks(): Observable<Books[]> {
    return this.http.get<Books[]>('/books/');
  }

  /* Load data by book id. */
  getBookByID(id: number): Observable<Books> {
    return this.http.get<Books>('/books/' + id);
  }

  /* Load data by customer id. */
  getBookByCustomerID(id: number): Observable<Books> {
    return this.http.get<Books>('/books/customer/' + id);
  }

  /* Writing data to a table. */
  insertBook(book: Books): Observable<Books> {
    return this.http.post<Books>('/books/create', book);
  }

  /* Updating table data. */
  updateBook(book: Books): Observable<void> {
    return this.http.put<void>('/books/update/', book);
  }

  /* Delete table data. */
  deleteBook(id: number) {
    return this.http.delete('/books/delete/' + id);
  }
}
