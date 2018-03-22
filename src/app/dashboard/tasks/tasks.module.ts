import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { CalendarModule } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from '../../shared/shared.module';

import { UsersTasksComponent } from './users-tasks/users-tasks.component';
import { ParticipantsTasksComponent } from './participants-tasks/participants-tasks.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { PhasesComponent } from './phases/phases.component';
import { RoadmapsFormComponent } from './roadmaps-form/roadmaps-form.component';
import { PhasesFormComponent } from './phases-form/phases-form.component';

@NgModule({
  imports: [CommonModule, TasksRoutingModule, CalendarModule, FormsModule, NgbModule, SharedModule],
  declarations: [
    TasksComponent,
    CalendarComponent,
    UsersTasksComponent,
    ParticipantsTasksComponent,
    RoadmapComponent,
    MilestonesComponent,
    PhasesComponent,
    RoadmapsFormComponent,
    PhasesFormComponent
  ],
  entryComponents: [RoadmapsFormComponent, PhasesFormComponent]
})
export class TasksModule {}
