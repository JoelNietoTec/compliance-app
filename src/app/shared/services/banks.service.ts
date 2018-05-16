import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { Bank } from '../models/profiles.model';

@Injectable()
export class BanksService {
  private _banksURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._banksURL = _conn.APIUrl + 'banks';
  }

  getBanks(): Observable<Bank[]> {
    return this._http.get<Bank[]>(this._banksURL);
  }

  getBank(id: number): Observable<Bank> {
    return this._http.get<Bank>(`${this._banksURL}/${id}`);
  }

  createBank(bank: Bank): Observable<Bank> {
    return this._http.post<Bank>(this._banksURL, JSON.stringify(bank), { headers: this._headers });
  }

  updateBank(id: number, bank: Bank): Observable<Bank> {
    return this._http.put<Bank>(`${this._banksURL}/${id}`, JSON.stringify(bank), { headers: this._headers });
  }

  deleteBank(id: number) {
    return this._http.delete(`${this._banksURL}/${id}`, { headers: this._headers });
  }
}
