import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConnectionService } from './connection.service';
import { ParamTable, ParamValue, ParamSubValue } from './../models/params.model';

@Injectable()
export class ParamTablesService {
  private _tablesURL: string;
  private _valuesURL: string;
  private _subValuesURL: string;
  private _tables: ParamTable[];
  private _table: ParamTable;
  private _newTable: ParamTable;
  private _newValue: ParamValue;
  private _newSubValue: ParamSubValue;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private _http: Http, private _conn: ConnectionService) {
    this._tablesURL = _conn.APIUrl + 'paramtables';
    this._valuesURL = _conn.APIUrl + 'paramvalues';
    this._subValuesURL = _conn.APIUrl + 'paramsubvalues';
  }

  getTables(): Observable<Array<ParamTable>> {
    return this._http.get(this._tablesURL).map((response: Response) => response.json());
  }

  getTable(_id: number): Observable<ParamTable> {
    return this._http.get(`${this._tablesURL}/${_id}`).map((response: Response) => response.json());
  }

  createTable(tab: ParamTable): Observable<ParamTable> {
    return this._http
      .post(this._tablesURL, JSON.stringify(tab), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  editTable(id: number, table: ParamTable): Observable<ParamTable> {
    return this._http
      .put(`${this._tablesURL}/${id}`, JSON.stringify(table), { headers: this._headers })
      .map((response: Response) => response.json());
  }

  deleteTable(id: number) {
    return this._http.delete(`${this._tablesURL}/${id}`, { headers: this._headers }).map((response: Response) => response.json());
  }

  addSubValue(val: ParamSubValue): Observable<ParamSubValue> {
    return this._http
      .post(this._subValuesURL, JSON.stringify(val), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  editSubValue(id: number, val: ParamSubValue): Observable<ParamSubValue> {
    return this._http
      .put(`${this._subValuesURL}/${id}`, JSON.stringify(val), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }
}
