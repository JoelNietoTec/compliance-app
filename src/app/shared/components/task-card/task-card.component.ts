import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TasksService } from '../../services/tasks.service';
import { Task, TaskStatus } from '../../models/tasks.model';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})

export class TaskCardComponent implements OnInit {

  @Input() task: Task;
  @Output() select = new EventEmitter();

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

  click() {
    this.select.emit(this.task);
  }
}
