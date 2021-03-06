import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';

import { Task, TaskStatus } from '../../../shared/models/tasks.model';
import { TasksService } from '../../../shared/services/tasks.service';
import { UtilService } from '../../../shared/services/util.service';
import { TaskFormComponent } from '../../../shared/components/task-form/task-form.component';
import { AssignmentsService } from '../../../shared/services/assignments.service';
import { Assignment } from '../../../shared/models/assignment.model';

interface FormTask extends Task {
  formBeginDate?: NgbDateStruct;
  formExpirationDate?: NgbDateStruct;
}

@Component({
  selector: 'users-tasks',
  templateUrl: './users-tasks.component.html',
  styleUrls: ['./users-tasks.component.css']
})
export class UsersTasksComponent implements OnInit {
  @Input() taskStatus: TaskStatus[];
  @ViewChild(TaskFormComponent) private taskForm: TaskFormComponent;

  closeResult: string;

  _currentTask: FormTask = {};
  _newTask: Task = {};
  _tasks: Task[];
  _assignments: Observable<Assignment[]>;

  constructor(
    private modalService: NgbModal,
    private _taskService: TasksService,
    private _dateFormatter: NgbDateParserFormatter,
    private _assignmentServ: AssignmentsService,
    private _util: UtilService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.taskStatus = JSON.parse(localStorage.getItem('taskStatus'));
    this._taskService.getTasksByCategory(1).subscribe(data => {
      this._tasks = data;
      this.sortTask();
    });

    this._assignments = this._assignmentServ.getAssigments();
  }

  open() {
    const modalRef = this.modalService.open(TaskFormComponent, { size: 'lg' });
    modalRef.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.saveTask();
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this._currentTask = {};
      }
    );

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
    this.open();
  }

  sortTask() {
    this._tasks = this._util.sortBy(this._tasks, 'ExpirationDate', true);
  }

  saveTask() {
    if (!this._currentTask.ID) {
      this.addTask();
    } else {
      this.updateTask();
    }
  }

  addTask() {
    this._currentTask.CategoryID = 1;
    this._currentTask.ProjectID = 1;
    this._taskService.createTasks(this._currentTask).subscribe(data => {
      this.toastr.success(data.Title, 'Tarea agregada');
      this._tasks.push(data);
      this.sortTask();
      this._currentTask = {};
    });
  }

  updateTask() {
    this._taskService.updateTask(this._currentTask.ID, this._currentTask).subscribe(data => {
      this.toastr.success(data.Title, 'Tarea editada');
      const oldItem = this._util.filterByID(this._tasks, this._currentTask.ID);
      const index = this._tasks.indexOf(oldItem);
      this._tasks[index] = this._currentTask;
      this._currentTask = {};
    });
  }
}
