import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { ConnectionService } from './connection.service';
import { Match, Comparison } from '../models/sanctions.model';
import { Participant } from '../models/participants.model';
import { ParticipantsService } from './participants.service';

@Injectable()
export class ComparisonsService {
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private _matchesURL: string;
  private _comparisonURL: string;

  constructor(private _http: HttpClient, private _conn: ConnectionService, private _partService: ParticipantsService) {
    this._comparisonURL = _conn.APIUrl + 'comparisons';
    this._matchesURL = _conn.APIUrl + 'matches';
  }

  getComparisons(): Observable<Comparison[]> {
    return this._http.get<Comparison[]>(this._comparisonURL);
  }

  getMatchesbyComparison(id: number): Observable<Match[]> {
    return this._http.get<Match[]>(`${this._comparisonURL}/${id}/matches`);
  }

  addComparison(fileName: string): Observable<Comparison> {
    const _comparison: Comparison = {};
    _comparison.File = fileName;
    return this._http.post(this._comparisonURL, JSON.stringify(_comparison), { headers: this._headers });
  }

  updateMatch(id: number, match: Match) {
    match.Confirmed = true;
    return this._http.put(`${this._matchesURL}/${id}`, JSON.stringify(match), { headers: this._headers });
  }

  addMatch(match: Match): Observable<Match> {
    return this._http.post<Match>(this._matchesURL, JSON.stringify(match), { headers: this._headers });
  }

  runComparison(comparisonID: number, sheet: any[], columns: any[]): Promise<any[]> {
    const matchs: any[] = [];
    return new Promise(resolve => {
      this._partService.getParticipants().subscribe(data => {
        const participants = data;
        participants.forEach(participant => {
          const partTerm = participant.FullName.toLocaleLowerCase().split(' ');
          sheet.forEach(row => {
            let count = 0;
            const match = row;
            columns.forEach(field => {
              const terms = row[field.name].toLocaleLowerCase().split(' ');
              terms.forEach(term => {
                if (partTerm.indexOf(term) >= 0 && term.length > 4) {
                  count = count + 1;
                }
              });
            });
            if (count > 1) {
              const val: any = {};
              val.participant = participant;
              val.score = count;
              val.match = match;
              matchs.push(val);
            }
          });
        });
        resolve(matchs);
      });
    });
  }
}
