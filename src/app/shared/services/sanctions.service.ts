import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private _listsURL: string;
  private _sanctionsURL: string;
  private _discardURL: string;
  private _matchesURL: string;

  constructor(
    private _http: HttpClient,
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
    return this._http.get<List[]>(this._listsURL);
  }

  getSanctionsByList(listID: number): Observable<Array<Sanction>> {
    return this._http.get<Sanction[]>(`${this._listsURL}/${listID}/sanctions`);
  }

  getDiscards(): Observable<Array<Discard>> {
    return this._http.get<Discard[]>(this._discardURL);
  }

  addDiscard(listID: number): Observable<Discard> {
    const _discard: Discard = {};
    _discard.ListID = listID;
    return this._http.post(this._discardURL, JSON.stringify(_discard), { headers: this._headers });
  }

  runDiscard(discardID: number, sanctions: Array<Sanction>): Promise<Array<any>> {
    const concurrences: Array<any> = [];

    return new Promise(resolve => {
      this._partService.getParticipants().subscribe(data => {
        const participants = data;
        sanctions.forEach(sanction => {
          const terms = sanction.Term1.toLocaleLowerCase().split(' ');
          participants.forEach(participant => {
            let searchTerm = this._util.isNullString(participant.firstName);
            searchTerm = searchTerm + this._util.isNullString(participant.thirdName);
            searchTerm = searchTerm.toLocaleLowerCase();
            terms.forEach(term => {
              if (searchTerm.indexOf(term) >= 0 && term.length > 4) {
                const match = {
                  sanctionID: sanction.ID,
                  participantID: participant.id
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
    return this._http.get<DiscardMatch[]>(`${this._discardURL}/${discardID}/matches`);
  }

  saveMatches(discardID: number, sanctionID: number, participantID: number): Observable<DiscardMatch> {
    const _match: DiscardMatch = {};
    _match.DiscardID = discardID;
    _match.SanctionID = sanctionID;
    _match.ParticipantID = participantID;
    console.log(_match);
    return this._http.post(this._matchesURL, JSON.stringify(_match), { headers: this._headers });
  }

  validMatch(matchID: number, valid: boolean): Observable<DiscardMatch> {
    let _valid: string;
    if (valid === true) {
      _valid = 'valid';
    } else {
      _valid = 'invalid';
    }

    return this._http.get(`${this._discardURL}/matches/${matchID}/${_valid}`);
  }
}
