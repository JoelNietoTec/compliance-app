import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConnectionService } from './connection.service';
import { List, Sanction, Discard, DiscardMatch } from '../models/sanctions.model';
import { Participant } from '../models/participants.model';
import { ParticipantsService } from './participants.service';
import { UtilService } from './util.service';

@Injectable()
export class SanctionsService {
  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _listsURL: string;
  private _sanctionsURL: string;
  private _discardURL: string;
  private _matchesURL: string;

  constructor(
    private _http: Http,
    private _conn: ConnectionService,
    private _partService: ParticipantsService,
    private _util: UtilService
  ) {
    this._listsURL = _conn.APIUrl + 'lists';
    this._sanctionsURL = _conn.APIUrl + 'sanctions';
    this._discardURL = _conn.APIUrl + 'discards';
    this._matchesURL = _conn.APIUrl + 'discardmatches';
  }

  getLists(): Observable<Array<List>> {
    return this._http.get(this._listsURL).map((response: Response) => response.json());
  }

  getSanctionsByList(listID: number): Observable<Array<Sanction>> {
    return this._http
      .get(`${this._listsURL}/${listID}/sanctions`)
      .map((response: Response) => response.json())
      .catch((err: Error) => Observable.throw(err.message));
  }

  getDiscards(): Observable<Array<Discard>> {
    return this._http
      .get(this._discardURL)
      .map((response: Response) => response.json())
      .catch((err: Error) => Observable.throw(err.message));
  }

  addDiscard(listID: number): Observable<Discard> {
    const _discard: Discard = {};
    _discard.ListID = listID;
    return this._http
      .post(this._discardURL, JSON.stringify(_discard), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => Observable.throw(err.message));
  }

  runDiscard(discardID: number, sanctions: Array<Sanction>): Promise<Array<any>> {
    let concurrences: Array<any> = [];

    return new Promise(resolve => {
      this._partService.getParticipants().subscribe(data => {
        let participants = data;
        sanctions.forEach(sanction => {
          const terms = sanction.Term1.toLocaleLowerCase().split(' ');
          participants.forEach(participant => {
            let searchTerm = this._util.isNullString(participant.FirstName);
            searchTerm = searchTerm + this._util.isNullString(participant.ThirdName);
            searchTerm = searchTerm.toLocaleLowerCase();
            terms.forEach(term => {
              if (searchTerm.indexOf(term) >= 0 && term.length > 4) {
                const match = {
                  sanctionID: sanction.ID,
                  participantID: participant.ID
                };
                concurrences.push(match);
              }
            });
          });
        });
        resolve(concurrences);
      });
    });
  }

  getMatches(discardID: number): Observable<Array<DiscardMatch>> {
    return this._http.get(`${this._discardURL}/${discardID}/matches`).map((response: Response) => response.json());
  }

  saveMatches(discardID: number, sanctionID: number, participantID: number): Observable<DiscardMatch> {
    const _match: DiscardMatch = {};
    _match.DiscardID = discardID;
    _match.SanctionID = sanctionID;
    _match.ParticipantID = participantID;
    console.log(_match);
    return this._http
      .post(this._matchesURL, JSON.stringify(_match), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => Observable.throw(console.log(err.message)));
  }
}
