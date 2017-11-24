import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConnectionService } from './connection.service';
import { ParamMatrix } from '../models/params.model';

@Injectable()
export class ParamMatricesService {
  private _matrixURL: string;
  private _newMatrix: ParamMatrix;
  private _matrix: ParamMatrix;
  private _matrices: Array<ParamMatrix>;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._matrixURL = _conn.APIUrl + 'parammatrices';
  }

  getMatrices(): Observable<Array<ParamMatrix>> {
    return this._http.get<ParamMatrix[]>(this._matrixURL);
  }

  getMatrix(_id: number): Observable<ParamMatrix> {
    return this._http.get<ParamMatrix>(`${this._matrixURL}/${_id}`);
  }

  createMatrix(mat: any): Observable<ParamMatrix> {
    return this._http.post<ParamMatrix>(this._matrixURL, JSON.stringify(mat), { headers: this._headers });
  }

  updateMatrix(id: number, matrix: ParamMatrix): Observable<ParamMatrix> {
    return this._http.put<ParamMatrix>(`${this._matrixURL}/${id}`, JSON.stringify(matrix), { headers: this._headers });
  }
}
