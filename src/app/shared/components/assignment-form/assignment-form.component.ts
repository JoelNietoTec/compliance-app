import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Assignment, Progress } from '../../models/assignment.model';
import { NgbDateStruct, NgbDateParserFormatter, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AssignmentsService } from '../../services/assignments.service';
import { ToastrService } from 'ngx-toastr';

interface FormAssignment extends Assignment {
  formStartDate?: NgbDateStruct;
  formDueDate?: NgbDateStruct;
}
const NOW = new Date();
@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {
  @Input() currentAssignment?: FormAssignment;
  @Output() addAssignment = new EventEmitter();
  @Output() updateAssignment = new EventEmitter();

  _assignment: FormAssignment;
  _progresses: Observable<Progress[]>;
  _maxDate: any;
  _minDate: any;

  constructor(
    private _assignServ: AssignmentsService,
    private _dateFormatter: NgbDateParserFormatter,
    public activeModal: NgbActiveModal,
    private toast: ToastrService
  ) {
    this._maxDate = { year: NOW.getFullYear() + 1, month: 12 };
    this._minDate = { year: NOW.getFullYear(), month: 1 };
  }

  ngOnInit() {
    this._progresses = this._assignServ.getProgress();
    if (this.currentAssignment) {
      this._assignment = this.currentAssignment;
      if (this._assignment.startDate) {
        this._assignment.formStartDate = this._dateFormatter.parse(this._assignment.startDate.toString());
      }
      if (this._assignment.dueDate) {
        this._assignment.formDueDate = this._dateFormatter.parse(this._assignment.dueDate.toString());
      } else {
        this._assignment = {};
      }
    }
  }

  updateDates() {
    this._assignment.startDate = new Date(this._dateFormatter.format(this._assignment.formStartDate));
    this._assignment.dueDate = new Date(this._dateFormatter.format(this._assignment.formDueDate));
  }

  save() {
    if (!this._assignment.id) {
      this._assignServ.createAssignment(this._assignment).subscribe(data => {
        this.toast.success('Tarea creada');
        this._assignment = data;
        this.addAssignment.emit(this._assignment);
        this._assignment = {};
      });
    } else {
      this._assignServ.updateAssigment(this._assignment.id, this._assignment).subscribe(data => {
        this.updateAssignment.emit(this._assignment);
        this._assignment = {};
      });
    }
  }
}
