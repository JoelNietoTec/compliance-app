import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Gender } from '../models/genders.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class GendersService {
  private _gendersURL: string;

  private _genders: Array<Gender>;

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._gendersURL = _conn.APIUrl + 'genders';
  }

  getGenders(): Observable<Array<Gender>> {
    return this._http.get<Gender[]>(this._gendersURL);
  }
}
