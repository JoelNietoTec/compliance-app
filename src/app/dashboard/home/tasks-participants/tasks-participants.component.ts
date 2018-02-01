import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../../shared/models/tasks.model';
import { Participant } from '../../../shared/models/participants.model';
import { TasksService } from '../../../shared/services/tasks.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'tasks-participants',
  templateUrl: './tasks-participants.component.html',
  styleUrls: ['./tasks-participants.component.css']
})
export class TasksParticipantsComponent implements OnInit {
  _tasks: Task[];
  _participants: Participant[];

  constructor(private _taskServ: TasksService, private _util: UtilService) {}

  ngOnInit() {
    // this._taskServ.getTasksByCategory(2).subscribe(data => {
    //   this._tasks = data;
    // });

    this._taskServ.getTaksByParticipant().subscribe(data => {
      this._participants = this._util.sortBy(data, 'FullName');
    });
  }
}
