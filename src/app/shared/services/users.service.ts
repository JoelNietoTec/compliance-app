import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/users.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class UserService {

  private _usrURL: string;
  private _user: User;
  private _users: User[];
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private _http: Http,
    private _conn: ConnectionService
  ) {
    this._usrURL = _conn.APIUrl + 'users';
  }

  getUsers(): Observable<User[]> {
    return this._http
      .get(this._usrURL)
      .map(response => {
        this._users = response.json();
        return this._users;
      });
  }

  getUser(_id: number): Observable<User> {
    return this._http
      .get(`${this._usrURL}/${_id}`)
      .map(response => {
        this._user = response.json();
        return this._user;
      });
  }

  createUser(usr: User): Observable<User> {
    return this._http
      .post(this._usrURL, JSON.stringify(usr), { headers: this._headers })
      .map(response => {
        this._user = response.json();
        return this._user;
      });
  }

}
