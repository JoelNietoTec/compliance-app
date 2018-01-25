import { Component, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../../shared/models/tasks.model';
import { TasksService } from '../../../shared/services/tasks.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'tasks-participants',
  templateUrl: './tasks-participants.component.html',
  styleUrls: ['./tasks-participants.component.css']
})
export class TasksParticipantsComponent implements OnInit {
  _tasks: Task[];

  constructor(private _taskServ: TasksService, private _util: UtilService) {}

  ngOnInit() {
    this._taskServ.getTasksByCategory(2).subscribe(data => {
      this._tasks = data;
    });
  }
}
