import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { SanctionList } from '../models/sanctions.model';

@Injectable()
export class SanctionListsService {
  _listURl: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._listURl = _conn.APIUrl + 'sanctionlists';
  }

  getLists(): Observable<SanctionList[]> {
    return this._http.get<SanctionList[]>(this._listURl);
  }

  addList(list: SanctionList): Observable<SanctionList> {
    return this._http.post(this._listURl, JSON.stringify(list), { headers: this._headers });
  }

  updateList(id: number, list: SanctionList) {
    return this._http.put(`${this._listURl}/${id}`, JSON.stringify(list), { headers: this._headers });
  }

  getListData(list: SanctionList) {
    return this._http.get(list.URL).subscribe(data => {
      console.log(data);
    });
  }
}
