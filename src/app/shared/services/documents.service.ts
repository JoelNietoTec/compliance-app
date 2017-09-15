import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConnectionService } from './connection.service';
import { DocumentType, ParticipantDocument } from '../models/documents.models';

@Injectable()
export class DocumentsService {

  private _documentURL: string;
  private _docTypeURL: string;
  private _partDocURL: string;
  private _partURL: string;
  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _types: Array<DocumentType>;

  constructor(
    private _http: Http,
    private _conn: ConnectionService
  ) {
    this._docTypeURL = _conn.APIUrl + 'documenttypes';
    this._documentURL = _conn.APIUrl + 'documents';
    this._partDocURL = _conn.APIUrl + 'participantdocuments';
    this._partURL = _conn.APIUrl + 'participants';
  }

  getTypes() {
    return this._http
      .get(this._docTypeURL)
      .map(response => {
        this._types = response.json();
        return this._types;
      });
  }

  getDocByParticipant(participantID: number): Observable<Array<ParticipantDocument>> {
    return this._http
      .get(`${this._partURL}/${participantID}/documents`)
      .map(response => {
        return response.json();
      });
  }

  saveDoc(doc: ParticipantDocument): Observable<ParticipantDocument> {
    return this._http
      .post(this._partDocURL, JSON.stringify(doc), { headers: this._headers })
      .map(response => {
        return response.json();
      });
  }

  deleteDoc(id: number) {
    return this._http
      .delete(`${this._partDocURL}/${id}`, { headers: this._headers })
      .map(response => {
        return response.json();
      });

  }



}
