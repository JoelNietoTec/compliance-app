import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { AlertSource, AlertReason, Alert } from '../models/alerts.model';
import { ParticipantProfile } from '../models/profiles.model';

@Injectable()
export class AlertsService {
  private _alertsURL: string;
  private _alertReasonsURL: string;
  private _alertSourcesURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._alertsURL = _conn.APIUrl + 'alerts';
    this._alertSourcesURL = _conn.APIUrl + 'alertsources';
    this._alertReasonsURL = _conn.APIUrl + 'alertreasons';
  }

  getAllAlerts(): Observable<Alert[]> {
    return this._http.get<Alert[]>(this._alertsURL);
  }

  createAlert(alert: Alert): Observable<Alert> {
    alert.CreateDate = new Date();
    return this._http.post<Alert>(this._alertsURL, JSON.stringify(alert), { headers: this._headers });
  }

  clearAlert(id: number, alert: Alert) {
    alert.Cleared = true;
    alert.ClearedDate = new Date();
    return this._http.put(`${this._alertsURL}/${id}`, JSON.stringify(alert), { headers: this._headers });
  }

  getSources(): Observable<AlertSource[]> {
    return this._http.get<AlertSource[]>(this._alertSourcesURL);
  }

  getSource(id: number): Observable<AlertSource> {
    return this._http.get<AlertSource>(`${this._alertSourcesURL}/${id}`);
  }

  getReasons(): Observable<AlertReason[]> {
    return this._http.get<AlertReason[]>(this._alertReasonsURL);
  }

  getReason(code: string): Observable<AlertReason> {
    return this._http.get<AlertReason>(`${this._alertReasonsURL}/bycode/${code}`);
  }

  createReason(reason: AlertReason): Observable<AlertReason> {
    return this._http.post<AlertReason>(this._alertReasonsURL, JSON.stringify(reason), { headers: this._headers });
  }

  editReason(id: number, reason: AlertReason) {
    return this._http.put(`${this._alertReasonsURL}/${id}`, JSON.stringify(reason), { headers: this._headers });
  }

  // processAlert(reason: AlertReason, profile: ParticipantProfile, )
}
