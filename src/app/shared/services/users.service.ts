import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/users.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class UserService {
  private _usrURL: string;
  private _user: User;
  private _users: Array<User>;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._usrURL = _conn.APIUrl + 'users';
  }

  getUsers(): Observable<Array<User>> {
    return this._http.get<User[]>(this._usrURL);
  }

  getUser(_id: number): Observable<User> {
    return this._http.get<User>(`${this._usrURL}/${_id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this._http.put<User>(`${this._usrURL}/${id}`, JSON.stringify(user), { headers: this._headers });
  }

  deleteUser(id: number) {
    return this._http.delete(`${this._usrURL}/${id}`, { headers: this._headers });
  }

  createUser(usr: User): Observable<User> {
    return this._http.post(this._usrURL, JSON.stringify(usr), { headers: this._headers });
  }
}
