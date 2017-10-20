import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Country } from '../models/country.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class CountriesService {
  private _countryURL: string;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http, private _conn: ConnectionService) {
    this._countryURL = _conn.APIUrl + 'countries';
  }

  getCountries(): Observable<Array<Country>> {
    return this._http
      .get(this._countryURL)
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  addCountry(country: Country): Observable<Country> {
    return this._http
      .post(this._countryURL, JSON.stringify(country), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  editCountry(id: number, country: Country): Observable<Country> {
    return this._http
      .put(`${this._countryURL}/${id}`, JSON.stringify(country), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => Observable.throw(console.log(err.message)));
  }

  deleteCountry(id: number) {
    return this._http
      .delete(`${this._countryURL}/${id}`, { headers: this._headers })
      .map((response: Response) => response.json)
      .catch((err: Error) => Observable.throw(console.log(err.message)));
  }
}
