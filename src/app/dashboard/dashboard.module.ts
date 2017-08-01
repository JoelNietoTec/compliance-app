import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { ToastyModule } from 'ng2-toasty';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';

// Routers
import { DashboardRoutingModule } from './dashboard-routing.module';

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
    HomeComponent
  ],
  providers: [BreadcrumbService]
})
export class DashboardModule { }
