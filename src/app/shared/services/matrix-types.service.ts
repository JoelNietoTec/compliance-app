import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MatrixType } from '../models/params.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class MatrixTypesService {
  private _matrixTypeURL: string;
  private _matrixTypes: MatrixType[];

  constructor(
    private _http: Http,
    private _conn: ConnectionService
  ) {
    this._matrixTypeURL = _conn.APIUrl + 'MatrixTypes';
  };

  getMatrixTypes() {
    return this._http
      .get(this._matrixTypeURL)
      .map(response => {
        this._matrixTypes = response.json();
        return this._matrixTypes;
      });
  }
}
