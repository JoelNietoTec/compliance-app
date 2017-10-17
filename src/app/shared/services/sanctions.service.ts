import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConnectionService } from './connection.service';
import { List, Sanction } from '../models/sanctions.model';
import { Participant } from '../models/participants.model';
import { ParticipantsService } from './participants.service';
import { UtilService } from './util.service';

@Injectable()
export class SanctionsService {

  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _listsURL: string;
  private _sanctionsURL: string;

  constructor(
    private _http: Http,
    private _conn: ConnectionService,
    private _partService: ParticipantsService,
    private _util: UtilService
  ) {
    this._listsURL = _conn.APIUrl + 'lists';
    this._sanctionsURL = _conn.APIUrl + 'sanctions';
  }

  getLists(): Observable<Array<List>> {
    return this._http
      .get(this._listsURL)
      .map((response: Response) => response.json());
  }

  getSanctionsByList(listID: number): Observable<Array<Sanction>> {
    return this._http
      .get(`${this._listsURL}/${listID}/sanctions`)
      .map((response: Response) => response.json());
  }

  runDiscard(sanctions: Array<Sanction>): Promise<Array<Participant>> {
    let concurrences: Array<Participant> = [];
    return new Promise(resolve => {
      this._partService.getParticipants()
        .subscribe(data => {
          let participants = data;
          sanctions.forEach(element => {
            const terms = element.Term1.toLocaleLowerCase().split(' ');
            participants.forEach(participant => {
              let searchTerm = this._util.isNullString(participant.FirstName);
              searchTerm = searchTerm + this._util.isNullString(participant.ThirdName);
              searchTerm = searchTerm.toLocaleLowerCase();
              terms.forEach(term => {
                if (searchTerm.indexOf(term) >= 0 && term.length > 4) {
                  concurrences.push(participant);
                }
              });
            });
          });
          resolve(concurrences);
        });
    });

  }

}
