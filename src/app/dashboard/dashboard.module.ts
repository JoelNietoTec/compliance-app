import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './home/home.module';
import { ParticipantsModule } from './participants/participants.module';
import { ParamsModule } from './params/params.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { TasksComponent } from './home/tasks/tasks.component';
import { CoreModule } from '../core/core.module';

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
    SettingsModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    BreadcrumbComponent
  ],
  providers: []
})
export class DashboardModule { }
