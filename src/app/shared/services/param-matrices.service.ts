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

  getMatrices(): Observable<Array<ParamMatrix>> {
    return this._http
      .get(this._matrixURL)
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  getMatrix(_id: number): Observable<ParamMatrix> {
    return this._http
      .get(`${this._matrixURL}/${_id}`)
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  createMatrix(mat: any): Observable<ParamMatrix> {
    return this._http
      .post(this._matrixURL, JSON.stringify(mat), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  updateMatrix(id: number, matrix: ParamMatrix): Observable<ParamMatrix> {
    return this._http
      .put(`${this._matrixURL}/${id}`, JSON.stringify(matrix), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

}
