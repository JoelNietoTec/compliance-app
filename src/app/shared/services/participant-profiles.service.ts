import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConnectionService } from './connection.service';
import { ParticipantProfile, ProfileAccount } from '../models/profiles.model';

@Injectable()
export class ParticipantProfilesService {
  _participantsURL: String;
  _accountsURL: string;
  _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._participantsURL = _conn.APIUrl + 'participants';
    this._accountsURL = _conn.APIUrl + 'profileaccounts';
  }

  getProfile(id: number): Observable<ParticipantProfile> {
    return this._http.get<ParticipantProfile>(`${this._participantsURL}/${id}/profile`);
  }

  updateProfile(id: number, profile: ParticipantProfile) {
    return this._http.put(`${this._participantsURL}/${id}`, JSON.stringify(profile), { headers: this._headers });
  }

  createAccount(account: ProfileAccount): Observable<ProfileAccount> {
    return this._http.post<ProfileAccount>(this._accountsURL, JSON.stringify(account), { headers: this._headers });
  }

  editAccount(id: number, account: ProfileAccount) {
    return this._http.put(`${this._accountsURL}/${id}`, JSON.stringify(account), { headers: this._headers });
  }
}
