import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from '../models/users.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class AuthService {

  private _loginURL: string;
  private _login: any = {
    UserName: '',
    Password: ''
  };
  public token: any;
  public _loggedUser: User;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private _http: Http,
    private _conn: ConnectionService
  ) {
    this._loginURL = _conn.APIUrl + 'users/login';
  }

  authLogin(login: any): Observable<Boolean> {
    console.log(login);
    return this._http
      .post(this._loginURL, JSON.stringify(login), { headers: this._headers })
      .map((response: Response) => {
        console.log(response);
        let token = response.json();
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: login.UserName, token: response.json() }));
          console.log(localStorage.getItem('currentUser'));
          return true;
        } else {
          return false;
        }
      })
      .catch((err: Response) => {
        return Observable.of(false);
      });
  }

  getUserInfo(): User {
    let login = JSON.parse(localStorage.getItem('currentUser'));
    return login.token;
  }

  authLogout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
