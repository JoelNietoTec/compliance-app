import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { ParticipantAlert } from '../models/alerts.model';

@Injectable()
export class ParticipantAlertsService {
  _alertsURL: string;
  _participantsURL: String;
  _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._alertsURL = _conn.APIUrl + 'participantalerts';
    this._participantsURL = _conn.APIUrl + 'participants';
  }

  getAlerts(): Observable<ParticipantAlert[]> {
    return this._http.get<ParticipantAlert[]>(this._alertsURL);
  }

  getAlertsByParticipant(id: number): Observable<ParticipantAlert[]> {
    return this._http.get<ParticipantAlert[]>(`${this._participantsURL}/${id}/alerts`);
  }

  createAlert(alert: ParticipantAlert): Observable<ParticipantAlert> {
    return this._http.post(this._alertsURL, JSON.stringify(alert), { headers: this._headers });
  }

  updateAlert(id: number, alert: ParticipantAlert) {
    return this._http.put(`${this._alertsURL}/${id}`, JSON.stringify(alert), { headers: this._headers });
  }
}
