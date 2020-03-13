import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Countries {
  CountryID: number;
  CountryName: string;
}

@Injectable({
  providedIn: 'root'
})

/* Service for working with countries data. */
export class CountriesService {

  /* Using HTTP Client for CRUD functions. */
  constructor(private http: HttpClient) { }

  /* Load all countries data. */
  getAllCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>('http://localhost:3000/countries/');
  }

  /* Load data by country id. */
  getCountryByID(id: number): Observable<Countries> {
    return this.http.get<Countries>('http://localhost:3000/countries/' + id);
  }

  /* Writing data to a table. */
  insertCountry(country: Countries): Observable<Countries> {
    return this.http.post<Countries>('http://localhost:3000/countries/create', country);
  }

  /* Updating table data. */
  updateCountry(country: Countries): Observable<void> {
    return this.http.put<void>('http://localhost:3000/countries/update/', country);
  }

  /* Delete table data. */
  deleteCountry(id: number) {
    return this.http.delete('http://localhost:3000/countries/delete/' + id);
  }
}
