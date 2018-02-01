import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConnectionService } from './connection.service';
import { Param } from '../models/params.model';

@Injectable()
export class ParamsService {
  private _paramsURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private _newParam: Param;

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._paramsURL = _conn.APIUrl + 'params';
  }

  addParams(par: Param): Observable<Param> {
    return this._http.post(this._paramsURL, JSON.stringify(par), { headers: this._headers });
  }

  editParam(id: number, param: Param): Observable<Param> {
    return this._http.put<Param>(`${this._paramsURL}/${id}`, JSON.stringify(param), { headers: this._headers });
  }

  deleteParam(id: number) {
    return this._http.delete(`${this._paramsURL}/${id}`, { headers: this._headers });
  }
}
