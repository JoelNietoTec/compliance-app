import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { ConnectionService } from './connection.service';
import { ParamCategory } from '../models/params.model';


@Injectable()
export class ParamCategoriesService {

  private _categoryURL: string;
  private _categories: ParamCategory[];
  private _newCategory: ParamCategory;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private _http: Http,
    private _conn: ConnectionService
  ) {
    this._categoryURL = _conn.APIUrl + 'paramcategories';
  }

  getCategories() {
    return this._http
      .get(this._categoryURL)
      .map(response => {
        this._categories = response.json();
        return this._categories;
      });
  }

  createCategory(cat: ParamCategory): Observable<ParamCategory> {
    return this._http
      .post(this._categoryURL, JSON.stringify(cat), { headers: this._headers })
      .map(response => {
        this._newCategory = response.json();
        return this._newCategory;
      });
  }

}
