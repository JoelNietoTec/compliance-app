import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/tasks.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() currentTask?: Task;
  @Output() addTask = new EventEmitter();
  @Output() updateTask = new EventEmitter();

  _task: Task;

  constructor(
    private _taskService: TasksService
  ) { }

  ngOnInit() {
    if (this.currentTask) {
      this._task = this.currentTask;
    } else {
      this._task = {};
    }
  }

  save() {
    if (!this._task.ID) {
      this._taskService.createTasks(this._task)
        .subscribe(data => {
          this._task = data;
          this.addTask.emit(this._task);
          this._task = {};
        });
    } else {
      this._taskService.updateTask(this._task.ID, this._task)
        .subscribe(data => {
          this.updateTask.emit(this._task);
          this._task = {};
        });
    }
  }

}
