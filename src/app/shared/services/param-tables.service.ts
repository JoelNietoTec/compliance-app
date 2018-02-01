import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConnectionService } from './connection.service';
import { ParamTable, ParamValue, ParamSubValue } from './../models/params.model';

@Injectable()
export class ParamTablesService {
  private _tablesURL: string;
  private _valuesURL: string;
  private _subValuesURL: string;
  private _tables: Array<ParamTable>;
  private _table: ParamTable;
  private _newTable: ParamTable;
  private _newValue: ParamValue;
  private _newSubValue: ParamSubValue;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._tablesURL = _conn.APIUrl + 'paramtables';
    this._valuesURL = _conn.APIUrl + 'paramvalues';
    this._subValuesURL = _conn.APIUrl + 'paramsubvalues';
  }

  getTables(): Observable<Array<ParamTable>> {
    return this._http.get<ParamTable[]>(this._tablesURL);
  }

  getTable(_id: number): Observable<ParamTable> {
    return this._http.get<ParamTable>(`${this._tablesURL}/${_id}`);
  }

  createTable(tab: ParamTable): Observable<ParamTable> {
    return this._http.post(this._tablesURL, JSON.stringify(tab), { headers: this._headers });
  }

  editTable(id: number, table: ParamTable): Observable<ParamTable> {
    return this._http.put(`${this._tablesURL}/${id}`, JSON.stringify(table), { headers: this._headers });
  }

  deleteTable(id: number) {
    return this._http.delete(`${this._tablesURL}/${id}`, { headers: this._headers });
  }

  addSubValue(val: ParamSubValue): Observable<ParamSubValue> {
    return this._http.post(this._subValuesURL, JSON.stringify(val), { headers: this._headers });
  }

  editSubValue(id: number, val: ParamSubValue): Observable<ParamSubValue> {
    return this._http.put(`${this._subValuesURL}/${id}`, JSON.stringify(val), { headers: this._headers });
  }
}
