import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MatrixType } from '../models/params.model';
import { ConnectionService } from './connection.service';

@Injectable()
export class MatrixTypesService {
  private _matrixTypeURL: string;
  private _matrixTypes: MatrixType[];

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._matrixTypeURL = _conn.APIUrl + 'MatrixTypes';
  }

  getMatrixTypes(): Observable<Array<MatrixType>> {
    return this._http.get<MatrixType[]>(this._matrixTypeURL);
  }
}
