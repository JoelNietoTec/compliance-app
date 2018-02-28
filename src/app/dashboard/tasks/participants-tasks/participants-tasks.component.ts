import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../../shared/models/tasks.model';
import { Participant } from '../../../shared/models/participants.model';
import { TasksService } from '../../../shared/services/tasks.service';
import { UtilService } from '../../../shared/services/util.service';
import { ParticipantsService } from '../../../shared/services/participants.service';

@Component({
  selector: 'participants-tasks',
  templateUrl: './participants-tasks.component.html',
  styleUrls: ['./participants-tasks.component.css']
})
export class ParticipantsTasksComponent implements OnInit {
  _tasks: Task[];
  _participants: Participant[];
  _view: string;

  constructor(private _taskServ: TasksService, private _util: UtilService, private _partServ: ParticipantsService) {
    this._view = 'alpha';
  }

  ngOnInit() {
    this._taskServ.getTaksByParticipant().subscribe(data => {
      this._participants = this._util.sortBy(data, 'ShortName');
    });
  }
}
