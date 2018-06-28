import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../../models/assignment.model';
import { AssignmentsService } from '../../services/assignments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css']
})
export class AssignmentCardComponent implements OnInit {
  @Input() assignment: Assignment;
  @Output() select = new EventEmitter();

  constructor(private _assignServ: AssignmentsService, private toast: ToastrService) {}

  ngOnInit() {}

  progress() {
    this.assignment.progressId++;
    this._assignServ.updateAssigment(this.assignment.id, this.assignment).subscribe(data => {
      this.toast.info(this.assignment.description, 'Tarea actualizada');
    });
  }

  click() {
    this.select.emit(this.assignment);
  }
}
