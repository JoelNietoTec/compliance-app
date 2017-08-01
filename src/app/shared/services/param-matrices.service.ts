import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConnectionService } from './connection.service';
import { ParamMatrix } from '../models/params.model';

@Injectable()
export class ParamMatricesService {

  private _matrixURL: string;
  private _newMatrix: ParamMatrix;
  private _matrix: ParamMatrix;
  private _matrices: ParamMatrix[];
  private _headers = new Headers({ 'Content-Type': 'application/json' });


  constructor(
    private _http: Http,
    private _conn: ConnectionService) {
    this._matrixURL = _conn.APIUrl + 'parammatrices';
  }

  getMatrices() {
    return this._http
      .get(this._matrixURL)
      .map(response => {
        this._matrices = response.json();
        return this._matrices;
      });
  }

  getMatrix(_id: number) {
    return this._http
      .get(this._matrixURL + '/' + _id)
      .map(response => {
        this._matrix = response.json();
        return this._matrix;
      });
  }

  createMatrix(mat: any): Observable<ParamMatrix> {
    return this._http
      .post(this._matrixURL, JSON.stringify(mat), { headers: this._headers })
      .map(response => {
        this._newMatrix = response.json();
        return this._newMatrix;
      });
  }

}
