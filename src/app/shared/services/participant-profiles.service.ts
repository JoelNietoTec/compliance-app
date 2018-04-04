import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConnectionService } from './connection.service';
import { ParticipantProfile, ProfileAccount, Transaction, FinancialDashboard } from '../models/profiles.model';

@Injectable()
export class ParticipantProfilesService {
  private _participantsURL: String;
  private _profilesURL: string;
  private _accountsURL: string;
  private _transactionsURL: string;
  private _dashboardURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._participantsURL = _conn.APIUrl + 'participants';
    this._accountsURL = _conn.APIUrl + 'profileaccounts';
    this._profilesURL = _conn.APIUrl + 'participantprofiles';
    this._transactionsURL = _conn.APIUrl + 'transactions';
    this._dashboardURL = _conn.APIUrl + 'financialdashboard';
  }

  getProfile(id: number): Observable<ParticipantProfile> {
    return this._http.get<ParticipantProfile>(`${this._participantsURL}/${id}/profile`);
  }

  updateProfile(id: number, profile: ParticipantProfile) {
    return this._http.put(`${this._profilesURL}/${id}`, JSON.stringify(profile), { headers: this._headers });
  }

  createAccount(account: ProfileAccount): Observable<ProfileAccount> {
    return this._http.post<ProfileAccount>(this._accountsURL, JSON.stringify(account), { headers: this._headers });
  }

  editAccount(id: number, account: ProfileAccount) {
    return this._http.put(`${this._accountsURL}/${id}`, JSON.stringify(account), { headers: this._headers });
  }

  getDashboards(): Observable<FinancialDashboard[]> {
    return this._http.get<FinancialDashboard[]>(this._dashboardURL);
  }

  getDashboard(id: number): Observable<FinancialDashboard[]> {
    return this._http.get<FinancialDashboard[]>(`${this._dashboardURL}/${id}`);
  }
}
