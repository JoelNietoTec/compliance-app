import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UtilService } from './util.service';
import { ConnectionService } from './connection.service';
import { Task, TaskStatus, TaskCount } from '../models/tasks.model';
import { Participant } from '../models/participants.model';
import { CalendarEvent } from 'calendar-utils';

@Injectable()
export class TasksService {
  private _taskURL: string;
  private _taskStatusURL: string;
  private _eventsURL: string;
  private _headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private _newTask: Task;
  private _tasks: Task[];
  private _events: CalendarEvent[];

  constructor(private _http: HttpClient, private _conn: ConnectionService, private _util: UtilService) {
    this._taskURL = _conn.APIUrl + 'tasks';
    this._taskStatusURL = _conn.APIUrl + 'taskstatus';
    this._eventsURL = _conn.APIUrl + 'tasksevents';
  }

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this._taskURL);
  }

  getTask(id: number): Observable<Task> {
    return this._http.get<Task>(`${this._taskURL}/${id}`);
  }

  getTasksByCategory(id: number): Observable<Task[]> {
    return this._http.get<Task[]>(`${this._taskURL}/category/${id}`);
  }

  getEvents(): Observable<CalendarEvent[]> {
    return this._http.get<CalendarEvent[]>(this._eventsURL);
  }

  getTaskCount(id: number): Observable<TaskCount[]> {
    return this._http.get<TaskCount[]>(`${this._taskURL}/category/${id}/count`);
  }

  getTaksByParticipant(): Observable<Participant[]> {
    return this._http.get<Participant[]>(`${this._taskURL}/byparticipant`);
  }

  createTasks(task: Task): Observable<Task> {
    return this._http.post<Task>(this._taskURL, JSON.stringify(task), { headers: this._headers });
  }

  getStatus(): Observable<TaskStatus[]> {
    return this._http.get<Array<TaskStatus>>(this._taskStatusURL);
  }

  updateTask(_id: number, _task: Task): Observable<Task> {
    return this._http.put<Task>(`${this._taskURL}/${_id}`, JSON.stringify(_task), { headers: this._headers });
  }

  progressTask(task: Task): Observable<Task> {
    return this._http.post(`${this._taskURL}/${task.ID}/progress`, { headers: this._headers }).map(response => {
      task.StatusID = task.StatusID + 1;
      return task;
    });
  }
}
