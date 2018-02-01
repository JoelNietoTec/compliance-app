import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConnectionService } from './connection.service';
import { ParamCategory } from '../models/params.model';

@Injectable()
export class ParamCategoriesService {
  private _categoryURL: string;
  private _matrxixURL: string;
  private _categories: ParamCategory[];
  private _newCategory: ParamCategory;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._categoryURL = _conn.APIUrl + 'paramcategories';
    this._matrxixURL = _conn.APIUrl + 'parammatrices';
  }

  getCategories(): Observable<Array<ParamCategory>> {
    return this._http.get<ParamCategory[]>(this._categoryURL);
  }

  getCategoriesByMatrix(matrixID: number): Observable<Array<ParamCategory>> {
    return this._http.get<ParamCategory[]>(`${this._matrxixURL}/${matrixID}/categories`);
  }

  createCategory(cat: ParamCategory): Observable<ParamCategory> {
    return this._http.post<ParamCategory>(this._categoryURL, JSON.stringify(cat), { headers: this._headers });
  }

  editCategory(id: number, cat: ParamCategory) {
    return this._http.put(`${this._categoryURL}/${id}`, JSON.stringify(cat), { headers: this._headers });
  }
}
