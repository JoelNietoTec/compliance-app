import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Task, TaskStatus } from '../../../shared/models/tasks.model';
import { TasksService } from '../../../shared/services/tasks.service';
import { UtilService } from '../../../shared/services/util.service';
import { TaskFormComponent } from '../../../shared/components/task-form/task-form.component';

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
  @ViewChild(TaskFormComponent)

  private taskForm: TaskFormComponent;

  closeResult: string;

  _currentTask: FormTask = {};
  _newTask: Task = {};
  _tasks: Array<Task>;

  constructor(
    private modalService: NgbModal,
    private _taskService: TasksService,
    private _dateFormatter: NgbDateParserFormatter,
    private _util: UtilService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.taskStatus = JSON.parse(localStorage.getItem('taskStatus'));
    this._taskService.getTasks()
      .subscribe(data => {
        this._tasks = data;
        this.sortTask();
      });
  }


  open() {
    const modalRef = this.modalService.open(TaskFormComponent, { size: 'lg' });
    modalRef.result
      .then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this._currentTask);
        this.saveTask();
        console.log(this.closeResult);
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this._currentTask = {};
        console.log(this.closeResult);
      });

    modalRef.componentInstance.currentTask = this._currentTask;
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

  selectTask(selectedTask: Task) {
    this._currentTask = Object.assign({}, this._currentTask, selectedTask);
    if (this._currentTask.BeginDate) {
      this._currentTask.formBeginDate = this._dateFormatter.parse(this._currentTask.BeginDate.toString());
    };
    if (selectedTask.ExpirationDate) {
      this._currentTask.formExpirationDate = this._dateFormatter.parse(this._currentTask.ExpirationDate.toString());
    };
    this.open();
  }

  sortTask() {
    this._tasks = this._util.sortBy(this._tasks, 'ExpirationDate', true);
  }

  saveTask() {
    this._currentTask.BeginDate = new Date(this._dateFormatter.format(this._currentTask.formBeginDate));
    this._currentTask.ExpirationDate = new Date(this._dateFormatter.format(this._currentTask.formExpirationDate));
    if (!this._currentTask.ID) {
      this.addTask();
    } else {
      this.updateTask();
    }
  }

  addTask() {
    this._taskService.createTasks(this._currentTask)
      .subscribe(data => {
        this.toastr.success(data.Title, 'Tarea agregada');
        this._tasks.push(data);
        this.sortTask();
        this._currentTask = {};
      });
  }

  updateTask() {
    this._taskService.updateTask(this._currentTask.ID, this._currentTask)
      .subscribe(data => {
        this.toastr.success(data.Title, 'Tarea editada');
        const oldItem = this._util.filterByID(this._tasks, this._currentTask.ID);
        const index = this._tasks.indexOf(oldItem);

        this._tasks[index] = this._currentTask;
      });
  }




}
