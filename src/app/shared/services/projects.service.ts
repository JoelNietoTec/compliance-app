import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { Observable } from 'rxjs';
import { Project } from '../models/assignment.model';

@Injectable()
export class ProjectsService {
  _projectsURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._projectsURL = _conn.APIUrl + 'projects';
  }

  getProjects(): Observable<Project[]> {
    return this._http.get<Project[]>(this._projectsURL);
  }

  getProject(id: number): Observable<Project> {
    return this._http.get<Project>(`${this._projectsURL}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this._http.post<Project>(this._projectsURL, JSON.stringify(project), { headers: this._headers });
  }

  updateProject(id: number, project: Project) {
    return this._http.put(`${this._projectsURL}/${id}`, JSON.stringify(project), { headers: this._headers });
  }

  deleteProject(id: number) {
    return this._http.delete(`${this._projectsURL}/${id}`, { headers: this._headers });
  }
}
