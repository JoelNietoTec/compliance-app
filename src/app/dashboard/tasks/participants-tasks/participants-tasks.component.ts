import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../../shared/models/tasks.model';
import { Participant } from '../../../shared/models/participants.model';
import { TasksService } from '../../../shared/services/tasks.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'participants-tasks',
  templateUrl: './participants-tasks.component.html',
  styleUrls: ['./participants-tasks.component.css']
})
export class ParticipantsTasksComponent implements OnInit {
  _tasks: Task[];
  _participants: Participant[];

  constructor(private _taskServ: TasksService, private _util: UtilService) {}

  ngOnInit() {
    this._taskServ.getTaksByParticipant().subscribe(data => {
      this._participants = this._util.sortBy(data, 'FullName');
    });
  }
}
