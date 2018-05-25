import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { SanctionList, SanctionedItem } from '../models/sanctions.model';

@Injectable()
export class SanctionListsService {
  _listURl: string;
  _matchesURL: string;

  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._listURl = _conn.APIUrl + 'sanctionlists';
    this._matchesURL = 'http://localhost:57682/api/' + 'sanctionmatches';
  }

  runDiscard() {
    return this._http.get(this._matchesURL + '/run/all');
  }

  getLists(): Observable<SanctionList[]> {
    return this._http.get<SanctionList[]>(this._listURl);
  }

  getItemsByList(id: number): Observable<SanctionedItem[]> {
    return this._http.get<SanctionedItem[]>(`${this._listURl}/${id}/items`);
  }

  getList(id: number): Observable<SanctionList> {
    return this._http.get<SanctionList>(`${this._listURl}/${id}`);
  }

  loadList(list: SanctionList) {
    return this._http.post(`${this._listURl}/load`, JSON.stringify(list), { headers: this._headers });
    // return this._http.post('http://localhost:65175/api/sanctionlists/load', JSON.stringify(list), { headers: this._headers });
  }

  addList(list: SanctionList): Observable<SanctionList> {
    return this._http.post(this._listURl, JSON.stringify(list), { headers: this._headers });
  }

  updateList(id: number, list: SanctionList) {
    return this._http.put(`${this._listURl}/${id}`, JSON.stringify(list), { headers: this._headers });
  }
}
