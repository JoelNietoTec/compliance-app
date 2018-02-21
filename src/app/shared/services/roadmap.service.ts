import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ConnectionService } from './connection.service';
import { UtilService } from './util.service';
import { Roadmap, Phase, Recurrence, Milestone } from '../models/roadmap.model';

@Injectable()
export class RoadmapService {
  private _roadmapURL: string;
  private _phaseURL: string;
  private _milesURL: string;
  private _recurrenceURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService, private _util: UtilService) {
    this._roadmapURL = _conn.APIUrl + 'roadmaps';
    this._phaseURL = _conn.APIUrl + 'phases';
    this._milesURL = _conn.APIUrl + 'milestones';
    this._recurrenceURL = _conn.APIUrl + 'recurrences';
  }

  getRoadmaps(): Observable<Roadmap[]> {
    return this._http.get<Roadmap[]>(this._roadmapURL);
  }

  getRoadmap(id: number): Observable<Roadmap> {
    return this._http.get<Roadmap>(`${this._roadmapURL}/${id}`);
  }

  createRoadmap(roadmap: Roadmap): Observable<Roadmap> {
    return this._http.post<Roadmap>(this._roadmapURL, JSON.stringify(roadmap), { headers: this._headers });
  }

  createPhase(phase: Phase): Observable<Phase> {
    return this._http.post<Phase>(this._phaseURL, JSON.stringify(phase), { headers: this._headers });
  }

  createMilestone(milestone: Milestone): Observable<Milestone> {
    return this._http.post<Milestone>(this._milesURL, JSON.stringify(milestone), { headers: this._headers });
  }

  getRecurrence(): Observable<Recurrence[]> {
    return this._http.get<Recurrence[]>(this._recurrenceURL);
  }
}
