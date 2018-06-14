import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private _http: HttpClient,
    private _conn: ConnectionService,
    private _countryServ: CountriesService,
    private _taskService: TasksService
  ) {
    this._loginURL = _conn.APIUrl + 'users/login';
  }

  authLogin(login: any): Observable<User> {
    return this._http.post<User>(this._loginURL, JSON.stringify(login), { headers: this._headers });
  }

  setCurrentUser(token: User) {
    localStorage.setItem('currentUser', JSON.stringify({ username: token.userName, token: token }));
    this.initLocalInfo();
  }

  getUserInfo(): User {
    const login = JSON.parse(localStorage.getItem('currentUser'));
    return login.token;
  }

  isLogged(): boolean {
    const login = JSON.parse(localStorage.getItem('currentUser'));
    if (login) {
      return true;
    } else {
      return false;
    }
  }

  authLogout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  initLocalInfo(): void {
    if (!localStorage.getItem('countries')) {
      this._countryServ.getCountries().subscribe(data => {
        this._countries = data;
        localStorage.setItem('countries', JSON.stringify(this._countries));
      });
    }

    if (!localStorage.getItem('taskStatus')) {
      this._taskService.getStatus().subscribe(data => {
        this._taskStatus = data;
        localStorage.setItem('taskStatus', JSON.stringify(this._taskStatus));
      });
    }
  }
}
