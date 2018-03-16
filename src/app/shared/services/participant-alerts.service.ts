import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { ParticipantAlert } from '../models/alerts.model';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Participant } from '../models/participants.model';

@Injectable()
export class ParticipantAlertsService {
  _alertsURL: string;
  _participantsURL: String;
  _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private _http: HttpClient, private _conn: ConnectionService, protected localStorage: AsyncLocalStorage) {
    this._alertsURL = _conn.APIUrl + 'participantalerts';
    this._participantsURL = _conn.APIUrl + 'participants';
  }

  getAlerts(): Observable<ParticipantAlert[]> {
    return this._http.get<ParticipantAlert[]>(this._alertsURL);
  }

  getLastAlerts(id: number): Observable<ParticipantAlert[]> {
    return this._http.get<ParticipantAlert[]>(`${this._alertsURL}/after/${id}`);
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

  initAlerts() {
    this.getAlerts().subscribe(data => {
      console.log(data);
      this.localStorage.setItem('alerts', data).subscribe(() => {});
    });
  }

  updateLastAlerts() {
    let currentAlerts: ParticipantAlert[];
    let lastID: number;
    this.localStorage.getItem<ParticipantAlert[]>('alerts').subscribe(alerts => {
      currentAlerts = alerts;
      lastID = currentAlerts[currentAlerts.length - 1].ID;
      this.getLastAlerts(lastID).subscribe(data => {
        data.forEach(element => {
          currentAlerts.push(element);
        });
        this.localStorage.setItem('alerts', currentAlerts).subscribe(() => {});
      });
    });
  }
}
