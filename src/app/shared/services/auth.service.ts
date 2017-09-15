import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from '../models/users.model';
import { Country } from '../models/country.model';
import { TaskStatus } from '../models/tasks.model';
import { ConnectionService } from './connection.service';
import { CountriesService } from './countries.service';
import { TasksService } from './tasks.service';

@Injectable()
export class AuthService {

  private _loginURL: string;
  private _login: any = {
    UserName: '',
    Password: ''
  };
  public token: any;
  public _countries: Array<Country>;
  public _taskStatus: Array<TaskStatus>;
  public _loggedUser: User;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private _http: Http,
    private _conn: ConnectionService,
    private _countryServ: CountriesService,
    private _taskService: TasksService
  ) {
    this._loginURL = _conn.APIUrl + 'users/login';
  }

  authLogin(login: any): Observable<Boolean> {
    console.log(login);
    return this._http
      .post(this._loginURL, JSON.stringify(login), { headers: this._headers })
      .map((response: Response) => {
        let token = response.json();
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: login.UserName, token: response.json() }));
          this.initLocalInfo();
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

  initLocalInfo(): void {
    if (!localStorage.getItem('countries')) {
      this._countryServ.getCountries()
        .subscribe(data => {
          this._countries = data;
          localStorage.setItem('countries', JSON.stringify(this._countries));
        });
    }

    if (!localStorage.getItem('taskStatus')) {
      console.log(localStorage.getItem('taskStatus'));
      this._taskService.getStatus()
        .subscribe(data => {
          this._taskStatus = data;
          localStorage.setItem('taskStatus', JSON.stringify(this._taskStatus));
        });
    }
  }

}
