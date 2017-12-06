import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Schedule, Job, Milestone } from '../models/schedules.models';
import { ConnectionService } from './connection.service';
import { HttpHeaderResponse } from '@angular/common/http/src/response';

@Injectable()
export class ScheduleService {
  private _scheduleURL: string;
  private _milestonesURL: string;
  private _jobsURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private _http: HttpClient, private _conn: ConnectionService) {
    this._milestonesURL = _conn.APIUrl + 'milestones';
    this._scheduleURL = _conn.APIUrl + 'schedules';
    this._jobsURL = _conn.APIUrl + 'jobs';
  }

  getSchedules(): Observable<Array<Schedule>> {
    return this._http.get<Array<Schedule>>(this._scheduleURL);
  }

  getCurrentSchedule(): Observable<Schedule> {
    return this._http.get<Schedule>(`${this._scheduleURL}/current`);
  }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    return this._http.post<Schedule>(this._scheduleURL, JSON.stringify(schedule), { headers: this._headers });
  }

  getMilestones(scheduleID: number): Observable<Array<Milestone>> {
    return this._http.get<Array<Milestone>>(`${this._scheduleURL}/${scheduleID}/milestones`);
  }

  getJobs(milestoneID: number): Observable<Array<Job>> {
    return this._http.get<Array<Job>>(`${this._milestonesURL}/${milestoneID}/jobs`);
  }
}
