import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Participant, ParticipantParam, PendingDocument } from '../models/participants.model';
import { ParticipantRelationship } from '../models/relationships.model';
import { ConnectionService } from './connection.service';
import { UtilService } from './util.service';
import { AuthService } from './auth.service';

@Injectable()
export class ParticipantsService {
  private _partURL: string;
  private _paramURL: string;
  private _participant: Participant;
  private _param: ParticipantParam;
  private _newParam: ParticipantParam;
  private _participants: Array<Participant>;
  private _newParticipant: Participant;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService, private _util: UtilService, private _auth: AuthService) {
    this._partURL = _conn.APIUrl + 'participants';
    this._paramURL = _conn.APIUrl + 'participantparams';
  }

  getParticipants(): Observable<Participant[]> {
    return this._http.get<Participant[]>(this._partURL);
  }

  getParticipant(_id: number): Observable<Participant> {
    return this._http.get<Participant>(`${this._partURL}/${_id}`);
  }

  createParticipant(part: Participant): Observable<Participant> {
    const _user = this._auth.getUserInfo(); // get Current User
    part.CreatedBy = _user.ID; // set User ID
    return this._http.post<Participant>(this._partURL, JSON.stringify(part), { headers: this._headers });
  }

  updateParticipant(_id: number, _part: Participant): Observable<Participant> {
    return this._http.put(`${this._partURL}/${_id}`, JSON.stringify(_part), { headers: this._headers });
  }

  searchParticipant(participants: Participant[], search: string): Participant[] {
    let filterParticipants: Participant[] = [];

    search = search.toLocaleLowerCase();

    for (let item of participants) {
      let term = this._util.isNullString(item.FirstName) + this._util.isNullString(item.SecondName);
      term = term + this._util.isNullString(item.ThirdName) + this._util.isNullString(item.FourthName);
      term = term.toLocaleLowerCase();

      if (term.indexOf(search) >= 0) {
        filterParticipants.push(item);
      }
    }

    return filterParticipants;
  }

  getParams(_partID: number): Observable<Array<ParticipantParam>> {
    return this._http.get<ParticipantParam[]>(`${this._partURL}/${_partID}/params`);
  }

  getParticipantParam(participantID: number, paramID: number): Observable<ParticipantParam> {
    return this._http.get<ParticipantParam>(`${this._partURL}/${participantID}/params/${paramID}`);
  }

  updateParam(_id: number, _param: ParticipantParam): Observable<ParticipantParam> {
    return this._http.put(this._paramURL + '/' + _id, JSON.stringify(_param), { headers: this._headers });
  }

  getRate(_part: Participant): string {
    if (!_part.Score) {
      return 'Incompleto';
    } else if (_part.Score < 3) {
      return 'Bajo';
    } else if (_part.Score < 6) {
      return 'Medio';
    } else {
      return 'Alto';
    }
  }

  getParticipantsbyRisk(): Observable<Array<any>> {
    return this._http.get<Array<any>>(`${this._partURL}/byrisk`);
  }

  getParticipantsbyCountry(): Observable<Array<any>> {
    return this._http.get<Array<any>>(`${this._partURL}/bycountry`);
  }

  getPendingDocuments(id: number): Observable<Array<PendingDocument>> {
    return this._http.get<PendingDocument[]>(`${this._partURL}/${id}/pending`);
  }
}
