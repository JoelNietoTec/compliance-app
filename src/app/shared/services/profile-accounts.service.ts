import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ConnectionService } from './connection.service';
import { Observable } from 'rxjs/Observable';
import { AccountType } from '../models/profiles.model';

@Injectable()
export class ProfileAccountsService {
  _typesURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._typesURL = _conn.APIUrl + 'accounttypes';
  }

  getTypes(): Observable<AccountType[]> {
    return this._http.get<AccountType[]>(this._typesURL);
  }

  addType(type: AccountType): Observable<AccountType> {
    return this._http.post<AccountType>(this._typesURL, JSON.stringify(type), { headers: this._headers });
  }

  editType(id: number, type: AccountType) {
    return this._http.put(`${this._typesURL}/${id}`, JSON.stringify(type), { headers: this._headers });
  }

  deleteType(id: number) {
    return this._http.delete(`${this._typesURL}/${id}`, { headers: this._headers });
  }
}
