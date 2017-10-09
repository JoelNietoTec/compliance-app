import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { TasksService } from '../../services/tasks.service';
import { Task, TaskStatus } from '../../models/tasks.model';

interface FormTask extends Task {
  formBeginDate?: NgbDateStruct;
  formExpirationDate?: NgbDateStruct;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() currentTask?: FormTask;
  @Output() addTask = new EventEmitter();
  @Output() updateTask = new EventEmitter();

  _task: FormTask;
  _taskStatus: Array<TaskStatus>;

  constructor(
    private _taskService: TasksService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {

    this._taskStatus = JSON.parse(localStorage.getItem('taskStatus'));

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
