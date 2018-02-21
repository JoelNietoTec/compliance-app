import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ],
  declarations: [ReportsComponent, ReportsHomeComponent]
})
export class ReportsModule { }
