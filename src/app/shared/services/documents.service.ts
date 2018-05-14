import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private _types: Array<DocumentType>;

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._docTypeURL = _conn.APIUrl + 'documenttypes';
    this._documentURL = _conn.APIUrl + 'documents';
    this._partDocURL = _conn.APIUrl + 'participantdocuments';
    this._partURL = _conn.APIUrl + 'participants';
  }

  getTypes(): Observable<DocumentType[]> {
    return this._http.get<DocumentType[]>(this._docTypeURL);
  }

  getExpired(): Observable<ParticipantDocument[]> {
    return this._http.get<ParticipantDocument[]>(`${this._partDocURL}/expired`);
  }

  getTypesByParticipant(id: number): Observable<DocumentType[]> {
    return this._http.get<DocumentType[]>(`${this._docTypeURL}/type/${id}`);
  }

  addType(type: DocumentType): Observable<DocumentType> {
    return this._http.post<DocumentType>(this._docTypeURL, type, { headers: this._headers });
  }

  updateType(id: number, type: DocumentType): Observable<DocumentType> {
    return this._http.put<DocumentType>(`${this._docTypeURL}/${id}`, type, { headers: this._headers });
  }

  deleteType(id: number) {
    return this._http.delete(`${this._docTypeURL}/${id}`, { headers: this._headers });
  }

  getDocByParticipant(participantID: number): Observable<ParticipantDocument[]> {
    return this._http.get<ParticipantDocument[]>(`${this._partURL}/${participantID}/documents`);
  }

  saveDoc(doc: ParticipantDocument): Observable<ParticipantDocument> {
    return this._http.post<ParticipantDocument>(this._partDocURL, JSON.stringify(doc), { headers: this._headers });
  }

  updateDocument(id: number, doc: ParticipantDocument) {
    return this._http.put(`${this._partDocURL}/${id}`, JSON.stringify(doc), { headers: this._headers });
  }

  deleteDoc(id: number) {
    return this._http.delete(`${this._partDocURL}/${id}`, { headers: this._headers });
  }
}
