import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConnectionService } from './connection.service';
import { ParamTable, ParamValue, ParamSubValue } from './../models/params.model';

@Injectable()
export class ParamSubValuesService {
  private _valuesURL: string;
  private _subValuesURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._valuesURL = _conn.APIUrl + 'paramvalues';
    this._subValuesURL = _conn.APIUrl + 'paramsubvalues';
  }

  addSubValue(val: ParamSubValue): Observable<ParamSubValue> {
    return this._http.post(this._subValuesURL, JSON.stringify(val), { headers: this._headers });
  }

  editSubValue(id: number, val: ParamSubValue): Observable<ParamSubValue> {
    return this._http.put(`${this._subValuesURL}/${id}`, JSON.stringify(val), { headers: this._headers });
  }

  deleteSubValue(id: number) {
    return this._http.delete(`${this._subValuesURL}/${id}`, { headers: this._headers });
  }
}
