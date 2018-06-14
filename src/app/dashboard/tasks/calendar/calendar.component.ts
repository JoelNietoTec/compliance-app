import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarDateFormatter, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { CustomDateFormatter } from '../../../shared/pipes/custom-date-formatter.provider';
import { TasksService } from '../../../shared/services/tasks.service';
import { TaskFormComponent } from '../../../shared/components/task-form/task-form.component';
import { Task } from '../../../shared/models/tasks.model';

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

interface TaskEvent extends CalendarEvent {
  id?: number;
  taskid?: number;
  categoryid?: number;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild(TaskFormComponent) taskForm: TaskFormComponent;

  view: string = 'month';

  viewDate: Date = new Date();

  public locale: string = 'es-MX';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      onClick: ({ event }: { event: TaskEvent }): void => {
        this.handleEvent('Editado', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: TaskEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: TaskEvent[];

  _events: CalendarEvent[];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private _taskServ: TasksService) {}
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  // eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
  //   event.start = newStart;
  //   event.end = newEnd;
  //   this.handleEvent('Cambiado o borrada', event);
  //   this.refresh.next();
  // }

  handleEvent(action: string, event: TaskEvent): void {
    if ((event.categoryid = 1)) {
      let _currentTask: Task;
      this._taskServ.getTask(event.taskid).subscribe(data => {
        _currentTask = data;
        this.open(_currentTask);
      });
    }
  }

  open(task: Task) {
    const modalRef = this.modal.open(TaskFormComponent, { size: 'lg' });
    modalRef.result.then(result => {}, reason => {});

    modalRef.componentInstance.currentTask = task;
  }

  addEvent(): void {
    this.events.push({
      title: 'Nuevo evento',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this._taskServ.getEvents().subscribe(data => {
      data.forEach(event => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        if (event.categoryid === 1) {
          event.color = colors.blue;
        } else {
          event.color = colors.yellow;
        }
      });
      this._events = data;
    });
  }
}
