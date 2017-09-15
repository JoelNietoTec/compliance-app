import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { ToastyModule } from 'ng2-toasty';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { CoreModule } from '../core/core.module';

// Routers
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TaskFormComponent } from './shared/components/task-form/task-form.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Ng2BreadcrumbModule.forRoot(),
    SharedModule,
    CoreModule,
    ChartsModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    TaskFormComponent
  ],
  providers: [BreadcrumbService]
})
export class DashboardModule { }
