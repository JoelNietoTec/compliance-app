import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { TasksService } from '../../services/tasks.service';
import { Task, TaskStatus } from '../../models/tasks.model';

interface FormTask extends Task {
  formBeginDate?: NgbDateStruct;
  formExpirationDate?: NgbDateStruct;
}
const NOW = new Date();
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
  _maxDate: any;
  _minDate: any;
  constructor(private _taskService: TasksService, private _dateFormatter: NgbDateParserFormatter, public activeModal: NgbActiveModal) {
    this._maxDate = { year: NOW.getFullYear() + 1, month: 1 };
    this._minDate = { year: NOW.getFullYear(), month: 1 };
  }

  ngOnInit() {
    this._taskStatus = JSON.parse(localStorage.getItem('taskStatus'));

    if (this.currentTask) {
      this._task = this.currentTask;
      if (this._task.BeginDate) {
        this._task.formBeginDate = this._dateFormatter.parse(this._task.BeginDate.toString());
      }
      if (this._task.ExpirationDate) {
        this._task.formExpirationDate = this._dateFormatter.parse(this._task.ExpirationDate.toString());
      }
    } else {
      this._task = {};
    }
  }

  updateDates() {
    this._task.BeginDate = new Date(this._dateFormatter.format(this._task.formBeginDate));
    this._task.ExpirationDate = new Date(this._dateFormatter.format(this._task.formExpirationDate));
  }

  save() {
    console.log('Hi');
    if (!this._task.ID) {
      this._taskService.createTasks(this._task).subscribe(data => {
        this._task = data;
        this.addTask.emit(this._task);
        this._task = {};
      });
    } else {
      this._taskService.updateTask(this._task.ID, this._task).subscribe(data => {
        this.updateTask.emit(this._task);
        this._task = {};
      });
    }
  }
}
