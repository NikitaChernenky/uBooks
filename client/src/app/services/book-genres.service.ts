/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

[Service] Book Genres
This service was made to perform various operations with Book Genres
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookGenres {
  BookGenreID: number;
  BookGenre: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with book genres data. */
export class BookGenresService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all book genres data. */
  getAllBookGenres(): Observable<BookGenres[]> {
    return this.http.get<BookGenres[]>('/bookgenres/');
  }

  /* Load data by book genre id. */
  getBookGenreByID(id: number): Observable<BookGenres> {
    return this.http.get<BookGenres>('/bookgenres/' + id);
  }

  /* Writing data to a table. */
  insertBookGenre(bookgenre: BookGenres): Observable<BookGenres> {
    return this.http.post<BookGenres>('/bookgenres/create', bookgenre);
  }

  /* Updating table data. */
  updateBookGenre(bookgenre: BookGenres): Observable<void> {
    return this.http.put<void>('/bookgenres/update/', bookgenre);
  }

  /* Delete table data. */
  deleteBookGenre(id: number) {
    return this.http.delete('/bookgenres/delete/' + id);
  }
}
