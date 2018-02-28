import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConnectionService } from './connection.service';
import { ParticipantProfile } from '../models/profiles.model';

@Injectable()
export class ParticipantProfilesService {
  _participantsURL: String;
  _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._participantsURL = _conn.APIUrl + 'participants';
  }

  getProfile(id: number): Observable<ParticipantProfile> {
    return this._http.get<ParticipantProfile>(`${this._participantsURL}/${id}/profile`);
  }
}
