import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './home/home.module';
import { ParticipantsModule } from './participants/participants.module';
import { ParamsModule } from './params/params.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { TasksModule } from './tasks/tasks.module';
import { TrainingModule } from './training/training.module';
import { CoreModule } from '../core/core.module';
import { ReportsModule } from './reports/reports.module';

// Routers
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CoreModule,
    HomeModule,
    UsersModule,
    SettingsModule,
    TrainingModule,
    ReportsModule
  ],
  exports: [],
  declarations: [DashboardComponent, BreadcrumbComponent],
  providers: []
})
export class DashboardModule {}
