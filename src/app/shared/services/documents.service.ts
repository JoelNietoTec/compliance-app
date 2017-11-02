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

  constructor(private _http: Http, private _conn: ConnectionService) {
    this._docTypeURL = _conn.APIUrl + 'documenttypes';
    this._documentURL = _conn.APIUrl + 'documents';
    this._partDocURL = _conn.APIUrl + 'participantdocuments';
    this._partURL = _conn.APIUrl + 'participants';
  }

  getTypes(): Observable<Array<DocumentType>> {
    return this._http
      .get(this._docTypeURL)
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  getTypesByParticipant(id: number): Observable<Array<DocumentType>> {
    return this._http
      .get(`${this._docTypeURL}/type/${id}`)
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  addType(type: DocumentType): Observable<DocumentType> {
    return this._http
      .post(this._docTypeURL, type, { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  updateType(id: number, type: DocumentType): Observable<DocumentType> {
    return this._http
      .put(`${this._docTypeURL}/${id}`, type, { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  deleteType(id: number) {
    return this._http.delete(`${this._docTypeURL}/${id}`, { headers: this._headers }).map((response: Response) => response.json());
  }

  getDocByParticipant(participantID: number): Observable<Array<ParticipantDocument>> {
    return this._http
      .get(`${this._partURL}/${participantID}/documents`)
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  saveDoc(doc: ParticipantDocument) {
    return this._http
      .post(this._documentURL, JSON.stringify(doc.File), { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }

  deleteDoc(id: number) {
    return this._http
      .delete(`${this._partDocURL}/${id}`, { headers: this._headers })
      .map((response: Response) => response.json())
      .catch((err: Error) => err.message);
  }
}
