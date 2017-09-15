import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CalendarModule } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { TasksComponent } from './tasks/tasks.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    NgbModule,
    HomeRoutingModule,
    CalendarModule.forRoot()
  ],
  declarations: [HomeComponent, TasksComponent, ScheduleComponent]
})
export class HomeModule { }
