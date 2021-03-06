import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConnectionService } from './connection.service';
import { ParamTable, ParamValue, ParamSubValue } from './../models/params.model';

@Injectable()
export class ParamValuesService {
  private _tablesURL: string;
  private _valuesURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._tablesURL = _conn.APIUrl + 'paramtables';
    this._valuesURL = _conn.APIUrl + 'paramvalues';
  }

  getValuesByTable(id: number): Observable<Array<ParamValue>> {
    return this._http.get<ParamValue[]>(`${this._tablesURL}/${id}/values`);
  }

  addValue(val: ParamValue): Observable<ParamValue> {
    return this._http.post(this._valuesURL, JSON.stringify(val), { headers: this._headers });
  }

  editValue(id: number, val: ParamValue): Observable<ParamValue> {
    return this._http.put(`${this._valuesURL}/${id}`, JSON.stringify(val), { headers: this._headers });
  }

  deleteValue(id: number) {
    return this._http.delete(`${this._valuesURL}/${id}`, { headers: this._headers });
  }
}
