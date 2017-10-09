import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Gender } from '../models/genders.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class GendersService {

  private _gendersURL: string;

  private _genders: Gender[];

  constructor(
    private _http: Http,
    private _conn: ConnectionService
  ) {
    this._gendersURL = _conn.APIUrl + 'genders';
  }

  getGenders(): Observable<Array<Gender>> {
    return this._http
      .get(this._gendersURL)
      .map((response: Response) => response.json());
  }
}
