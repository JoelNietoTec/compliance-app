import { Component, OnInit, ViewChild } from '@angular/core';
import { Assignment, Progress } from '../../../shared/models/assignment.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentFormComponent } from '../../../shared/components/assignment-form/assignment-form.component';
import { Observable } from 'rxjs';
import { AssignmentsService } from '../../../shared/services/assignments.service';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../../shared/services/util.service';

interface FormAssignment extends Assignment {
  formStartDate?: NgbDateStruct;
  formDueDate?: NgbDateStruct;
}

@Component({
  selector: 'assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  @ViewChild(AssignmentFormComponent) private assignmentForm: AssignmentFormComponent;

  closeResult: string;
  _currentAssignment: FormAssignment = {};
  _assignments: Assignment[];
  _progresses: Observable<Progress[]>;
  constructor(
    private _util: UtilService,
    private modalService: NgbModal,
    private _assignServ: AssignmentsService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this._progresses = this._assignServ.getProgress();
    this._assignServ.getAssigments().subscribe(data => {
      this._assignments = data;
    });
  }

  open() {
    const modalRef = this.modalService.open(AssignmentFormComponent, { size: 'lg' });
    modalRef.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.saveAssignment();
      },
      reason => {
        this._currentAssignment = {};
      }
    );

    modalRef.componentInstance.currentAssignment = this._currentAssignment;
  }

  selectAssignment(selected: Assignment) {
    this._currentAssignment = Object.assign({}, this._currentAssignment, selected);
    this.open();
  }

  sortAssignment() {
    this._assignments = this._util.sortBy(this._assignments, 'dueDate', true);
  }

  addAssignment() {
    this._currentAssignment.assignmentTypeId = 1;
    this._assignServ.createAssignment(this._currentAssignment).subscribe(data => {
      this.toast.success(data.title, 'Tarea agregada');
      this._assignments.push(data);
      this._currentAssignment = {};
    });
  }

  saveAssignment() {
    if (!this._currentAssignment.id) {
      this.addAssignment();
    } else {
      this.updateAssignment();
    }
  }

  updateAssignment() {
    this._assignServ.updateAssigment(this._currentAssignment.id, this._currentAssignment).subscribe(data => {
      this.toast.info(this._currentAssignment.title, 'Tarea actualizada');
      const oldItem = this._util.filterByID(this._assignments, this._currentAssignment.id);
      const index = this._assignments.indexOf(oldItem);
      this._assignments[index] = this._currentAssignment;
      this._currentAssignment = {};
    });
  }
}
