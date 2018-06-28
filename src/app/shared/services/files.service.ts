import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { Observable } from 'rxjs/Observable';
import { Document } from '../models/documents.models';

@Injectable()
export class FilesService {
  private filesURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this.filesURL = _conn.APIUrl + 'uploadfiles';
  }

  uploadFiles(files: File[]): Observable<Document> {

    if (files.length > 0) {
      const formData: FormData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i], files[i].name);
      }
      return this._http.post<Document>(this.filesURL, formData);
    }
  }
}
