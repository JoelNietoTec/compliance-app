import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConnectionService } from './connection.service';
import { RelationshipType, ParticipantRelationship } from '../models/relationships.model';

@Injectable()
export class RelationshipsService {

  private _typesURL: string;
  private _participantsURL: string;
  private _relationshipsURL: string;
  private _types: Array<RelationshipType>;
  private _newType: RelationshipType;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private _http: Http,
    private _conn: ConnectionService
  ) {
    this._typesURL = _conn.APIUrl + 'relationshiptypes';
    this._participantsURL = _conn.APIUrl + 'participants';
  }

  getRelationships(participantID: number): Observable<Array<ParticipantRelationship>> {
    return this._http
      .get(`${this._participantsURL}/${participantID}/relationships`)
      .map((response: Response) => response.json());
  }

  getTypes(): Observable<Array<RelationshipType>> {
    return this._http
      .get(this._typesURL)
      .map((response: Response) => response.json());
  }

  createType(type: RelationshipType): Observable<RelationshipType> {
    return this._http
      .post(this._typesURL, JSON.stringify(type), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => Observable.throw(console.log(err.message)));
  }

  updateType(id: number, type: RelationshipType): Observable<RelationshipType> {
    return this._http
      .put(`${this._typesURL}/${id}`, JSON.stringify(type), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => Observable.throw(console.log(err.message)));
  }

  deleteType(id: number) {
    return this._http
      .delete(`${this._typesURL}/${id}`, { headers: this._headers })
      .map((response: Response) => response.json());
  }

}
