import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Country } from '../models/country.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class CountriesService {
  private _countryURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._countryURL = _conn.APIUrl + 'countries';
  }

  getCountries(): Observable<Array<Country>> {
    return this._http.get<Array<Country>>(this._countryURL);
  }

  addCountry(country: Country): Observable<Country> {
    return this._http.post(this._countryURL, JSON.stringify(country), { headers: this._headers });
  }

  editCountry(id: number, country: Country): Observable<Country> {
    return this._http.put(`${this._countryURL}/${id}`, JSON.stringify(country), { headers: this._headers });
  }

  deleteCountry(id: number) {
    return this._http.delete(`${this._countryURL}/${id}`, { headers: this._headers });
  }
}
