import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from '../../shared/components/task-form/task-form.component';
import { TasksParticipantsComponent } from './tasks-participants/tasks-participants.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    HomeRoutingModule,
    CalendarModule.forRoot()
  ],
  declarations: [HomeComponent, TasksComponent, TasksParticipantsComponent, CalendarComponent],
  entryComponents: [TaskFormComponent]
})
export class HomeModule { }
