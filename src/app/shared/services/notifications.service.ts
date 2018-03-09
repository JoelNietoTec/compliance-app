import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { Notification } from '../models/notifications.model';

@Injectable()
export class NotificationService {
  _notificationsURL: string;
  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._notificationsURL = _conn.APIUrl + 'notifications';
  }

  getNotification(last: number): Observable<Notification[]> {
    return this._http.get<Notification[]>(`${this._notificationsURL}/last/${last}`);
  }
}
