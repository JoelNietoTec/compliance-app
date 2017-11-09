import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConnectionService } from './connection.service';

@Injectable()
export class MapsService {
  private _gMapsURL: string;

  constructor(private _http: Http, private _conn: ConnectionService) {
    this._gMapsURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
  }

  getPosition(address: string): Observable<any> {
    let terms = address.split(' ');
    let term = '';
    terms.forEach(element => {
      term = term + '+' + element;
    });
    return this._http.get(`${this._gMapsURL}address=${term}&key=${this._conn.MAP_KEY}`).map((response: Response) => response.json());
  }
}
