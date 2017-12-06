import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../../../shared/services/schedules.service';
import { Schedule, Job, Milestone } from '../../../shared/models/schedules.models';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  _schedule: Schedule;
  constructor(private _scheduleService: ScheduleService) {}

  ngOnInit() {
    this._scheduleService.getCurrentSchedule().subscribe(data => {
      this._schedule = data;
    });
  }
}
