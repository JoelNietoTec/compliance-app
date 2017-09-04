import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConnectionService } from './connection.service';
import { RelationshipType } from '../models/relationships.model';

@Injectable()
export class RelationTypesService {

  private _typesURL: string;
  private _types: Array<RelationshipType>;
  private _newType: RelationshipType;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private _http: Http,
    private _conn: ConnectionService
  ) {
    this._typesURL = _conn.APIUrl + 'relationshiptypes';
  }

  getTypes(): Observable<Array<RelationshipType>> {
    return this._http
      .get(this._typesURL)
      .map(response => {
        this._types = response.json();
        return this._types;
      });
  }

  createType(type: RelationshipType) {
    return this._http
      .post(this._typesURL, JSON.stringify(type), { headers: this._headers })
      .map(response => {
        this._newType = response.json();
        return this._newType;
      });
  }

}
