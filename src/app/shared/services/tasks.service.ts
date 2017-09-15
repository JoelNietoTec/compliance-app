import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UtilService } from './util.service';
import { ConnectionService } from './connection.service';
import { Task, TaskStatus } from '../models/tasks.model';

@Injectable()
export class TasksService {

  private _taskURL: string;
  private _taskStatusURL: string;
  private _headers = new Headers({ 'Content-Type': 'application/json' });
  private _newTask: Task;
  private _tasks: Array<Task>;

  constructor(
    private _http: Http,
    private _conn: ConnectionService,
    private _util: UtilService
  ) {
    this._taskURL = _conn.APIUrl + 'tasks';
    this._taskStatusURL = _conn.APIUrl + 'taskstatus';
  }

  getTasks(): Observable<Array<Task>> {
    return this._http
      .get(this._taskURL)
      .map(response => {
        return response.json();
      });
  }

  createTasks(task: Task): Observable<Task> {
    return this._http
      .post(this._taskURL, JSON.stringify(task), { headers: this._headers })
      .map(response => {
        this._newTask = response.json();
        return this._newTask;
      });
  }

  getStatus(): Observable<Array<TaskStatus>> {
    return this._http
      .get(this._taskStatusURL)
      .map(response => {
        return response.json();
      });
  }

  updateTask(_id: number, _task: Task): Observable<Task> {
    return this._http
      .put(`${this._taskURL}/${_id}`, JSON.stringify(_task), { headers: this._headers })
      .map(response => {
        this._newTask = response.json();
        return this._newTask;
      });
  }

  progressTask(task: Task): Observable<Task> {
    return this._http
      .post(`${this._taskURL}/${task.ID}/progress`, { headers: this._headers })
      .map(response => {
        task.StatusID = task.StatusID + 1;
        console.log(task);
        return task;
      });
  }

}
