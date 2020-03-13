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
    return this.http.get<BookGenres[]>('http://localhost:3000/bookgenres/');
  }

  /* Load data by book genre id. */
  getBookGenreByID(id: number): Observable<BookGenres> {
    return this.http.get<BookGenres>('http://localhost:3000/bookgenres/' + id);
  }

  /* Writing data to a table. */
  insertBookGenre(bookgenre: BookGenres): Observable<BookGenres> {
    return this.http.post<BookGenres>('http://localhost:3000/bookgenres/create', bookgenre);
  }

  /* Updating table data. */
  updateBookGenre(bookgenre: BookGenres): Observable<void> {
    return this.http.put<void>('http://localhost:3000/bookgenres/update/', bookgenre);
  }

  /* Delete table data. */
  deleteBookGenre(id: number) {
    return this.http.delete('http://localhost:3000/bookgenres/delete/' + id);
  }
}
