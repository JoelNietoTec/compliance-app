import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { Observable } from 'rxjs';
import { Assignment, Progress } from '../models/assignment.model';

@Injectable()
export class AssignmentsService {
  private _assignmentsURL: string;
  private _progressURL: string;

  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._assignmentsURL = _conn.APIUrl + 'assignments';
    this._progressURL = _conn.APIUrl + 'progress';
  }

  getProgress(): Observable<Progress[]> {
    return this._http.get<Progress[]>(this._progressURL);
  }

  getAssigments(): Observable<Assignment[]> {
    return this._http.get<Assignment[]>(this._assignmentsURL);
  }

  getAssignment(id: number): Observable<Assignment> {
    return this._http.get<Assignment>(`${this._assignmentsURL}/${id}`);
  }

  createAssignment(assigment: Assignment): Observable<Assignment> {
    return this._http.post<Assignment>(this._assignmentsURL, JSON.stringify(assigment), { headers: this._headers });
  }

  updateAssigment(id: number, assignment: Assignment) {
    return this._http.put(`${this._assignmentsURL}/${id}`, JSON.stringify(assignment), { headers: this._headers });
  }

  deleteAssignment(id: number) {
    return this._http.delete(`${this._assignmentsURL}/${id}`);
  }
}
