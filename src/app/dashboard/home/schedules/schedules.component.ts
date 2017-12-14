import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ScheduleService } from '../../../shared/services/schedules.service';
import { Schedule, Job, Milestone } from '../../../shared/models/schedules.models';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  _schedule: Schedule;
  _milestone: Milestone = {};
  _job: Job = {};
  closeResult: string;

  constructor(private _scheduleService: ScheduleService, private modalService: NgbModal, private toastr: ToastsManager) {}

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule() {
    this._scheduleService.getCurrentSchedule().subscribe(data => {
      this._schedule = data;
    });
  }

  openMilestone(content) {
    this.modalService.open(content).result.then(
      result => {
        this.addMilestone();
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openJob(content, milestoneID?: number) {
    this.modalService.open(content).result.then(
      result => {
        this.addJob(milestoneID);
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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

  addMilestone() {
    this._milestone.ScheduleID = this._schedule.ID;
    this._scheduleService.createMilestone(this._milestone).subscribe(data => {
      this.toastr.success('Actividad Macro Creada');
      this._schedule.Milestones.push(data);
      this._milestone = {};
    });
  }

  addJob(milestoneID: number) {
    this._job.MilestoneID = milestoneID;
    this._scheduleService.createJob(this._job).subscribe(data => {
      this.toastr.success('Actividad Creada');
      this._job = {};
      this.getSchedule();
    });
  }
}
