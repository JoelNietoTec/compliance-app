import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private _types: RelationshipType[];
  private _newType: RelationshipType;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._typesURL = _conn.APIUrl + 'relationshiptypes';
    this._relationshipsURL = _conn.APIUrl + 'participantrelationships';
    this._participantsURL = _conn.APIUrl + 'participants';
  }

  getRelationships(participantID: number): Observable<ParticipantRelationship[]> {
    return this._http.get<ParticipantRelationship[]>(`${this._participantsURL}/${participantID}/relationships`);
  }

  getTypes(): Observable<RelationshipType[]> {
    return this._http.get<RelationshipType[]>(this._typesURL);
  }

  createType(type: RelationshipType): Observable<RelationshipType> {
    return this._http.post(this._typesURL, JSON.stringify(type), { headers: this._headers });
  }

  updateType(id: number, type: RelationshipType): Observable<RelationshipType> {
    return this._http.put(`${this._typesURL}/${id}`, JSON.stringify(type), { headers: this._headers });
  }

  deleteType(id: number) {
    return this._http.delete(`${this._typesURL}/${id}`, { headers: this._headers });
  }

  addRelationship(relationship: ParticipantRelationship): Observable<ParticipantRelationship> {
    return this._http.post(this._relationshipsURL, JSON.stringify(relationship), { headers: this._headers });
  }

  deleteRelationship(id: number) {
    return this._http.delete(`${this._relationshipsURL}/${id}`, { headers: this._headers });
  }
}
