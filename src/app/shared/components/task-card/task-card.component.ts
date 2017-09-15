import { Component, OnInit, Input } from '@angular/core';

import { TasksService } from '../../services/tasks.service';
import { Task, TaskStatus } from '../../models/tasks.model';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})

export class TaskCardComponent implements OnInit {

  @Input() task: Task;

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit() { }

  progressTask() {
    this.taskService.progressTask(this.task)
      .subscribe(data => {
        this.task = data;
      });
  }
}
