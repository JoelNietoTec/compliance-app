import { Component, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';

import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';

import { TasksService } from '../../../shared/services/tasks.service';
import { Task, TaskStatus } from '../../../shared/models/tasks.model';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'home-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  view: string = 'month';
  events: Array<CalendarEvent> = [];
  viewDate: Date = new Date();

  constructor(private _taskService: TasksService) {}

  ngOnInit() {
    this._taskService.getTasks().subscribe(tasks => {
      tasks.forEach(task => {
        let event: CalendarEvent = {
          title: task.Title,
          start: task.BeginDate,
          end: task.ExpirationDate,
          allDay: true,
          color: colors.red
        };
        this.events.push(event);
      });
    });
  }

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'Trimestral Tests',
  //     color: colors.red
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'Biology´s Project',
  //     color: colors.yellow
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,

  //     draggable: true
  //   }
  // ];
}
