import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Participant, ParticipantParam } from '../models/participants.model';
import { ConnectionService } from './connection.service';
import { UtilService } from './util.service';

@Injectable()
export class ParticipantsService {

  private _partURL: string;
  private _paramURL: string;
  private _participant: Participant;
  private _param: ParticipantParam;
  private _newParam: ParticipantParam;
  private _participants: Participant[];
  private _newParticipant: Participant;
  private _headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private _http: Http,
    private _conn: ConnectionService,
    private _util: UtilService
  ) {
    this._partURL = _conn.APIUrl + 'participants';
    this._paramURL = _conn.APIUrl + 'participantparams';
  }

  getParticipants() {
    return this._http
      .get(this._partURL)
      .map(response => {
        this._participants = response.json();
        return this._participants;
      });
  }

  getParticipant(_id: number) {
    return this._http
      .get(this._partURL + '/' + _id)
      .map(response => {
        this._participant = response.json();
        return this._participant;
      });
  };

  createParticipant(ind: any): Observable<Participant> {
    return this._http
      .post(this._partURL, JSON.stringify(ind), { headers: this._headers })
      .map(response => {
        this._newParticipant = response.json();
        return this._newParticipant;
      });
  }

  updateParticipant(_id: number, _part: Participant): Observable<Participant> {
    return this._http
      .put(`${this._partURL}/${_id}`, JSON.stringify(_part), { headers: this._headers })
      .map(response => {
        return response.json();
      });
  }

  searchParticipant(participants: Participant[], search: string): Participant[] {

    let filterParticipants: Participant[] = [];

    search = search.toLocaleLowerCase();

    for (let item of participants) {
      let term = this._util.isNullString(item.FirstName) + this._util.isNullString(item.SecondName);
      term = term + this._util.isNullString(item.ThirdName) + this._util.isNullString(item.FourthName);
      // console.log(term);
      term = term.toLocaleLowerCase();

      if (term.indexOf(search) >= 0) {
        filterParticipants.push(item);
      }
    }

    return filterParticipants;

  }

  updateParam(_id: number, _param: ParticipantParam): Observable<ParticipantParam> {
    return this._http
      .put(this._paramURL + '/' + _id, JSON.stringify(_param), { headers: this._headers })
      .map(response => {
        this._newParam = response.json();
        return this._newParam;
      });
  }

  getRate(_part: Participant): string {
    if (!_part.Score) {
      return 'Incomplete';
    } else if (_part.Score < 3) {
      return 'Low';
    } else if (_part.Score < 6) {
      return 'Medium';
    } else {
      return 'High';
    }
  }

  getParticipantsbyRisk(): any {
    return this._http
      .get(`${this._partURL}/byrisk`)
      .map(response => {
        return response.json();
      });
  }
}
