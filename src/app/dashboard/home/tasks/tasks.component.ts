import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Task, TaskStatus } from '../../../shared/models/tasks.model';
import { TasksService } from '../../../shared/services/tasks.service';
import { UtilService } from '../../../shared/services/util.service';

interface FormTask extends Task {
  formBeginDate?: NgbDateStruct;
  formExpirationDate?: NgbDateStruct;
}

@Component({
  selector: 'home-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  @Input() taskStatus: Array<TaskStatus>;

  closeResult: string;

  _newTask: FormTask = {};
  _currentTask: Task;
  _tasks: Array<Task>;

  constructor(
    private modalService: NgbModal,
    private _taskService: TasksService,
    private _dateFormatter: NgbDateParserFormatter,
    private _util: UtilService
  ) { }

  ngOnInit() {
    this.taskStatus = JSON.parse(localStorage.getItem('taskStatus'));
    this._taskService.getTasks()
      .subscribe(data => {
        this._tasks = data;
        this.sortTask();
      });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.addTask();
      this._newTask = {};
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this._newTask = {};
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sortTask() {
    this._tasks = this._util.sortBy(this._tasks, 'ExpirationDate', true);
  }

  addTask() {
    this._newTask.BeginDate = new Date(this._dateFormatter.format(this._newTask.formBeginDate));
    this._newTask.ExpirationDate = new Date(this._dateFormatter.format(this._newTask.formExpirationDate));
    this._taskService.createTasks(this._newTask)
      .subscribe(data => {
        this._tasks.push(data);
        this.sortTask();
        this._currentTask = {};
      });
  }

}
