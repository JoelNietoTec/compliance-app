import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { SharedModule } from '../../shared/shared.module';
import { ReportsParticipantsComponent } from './reports-participants/reports-participants.component';
import { ReportsIndividualsComponent } from './reports-individuals/reports-individuals.component';
import { ReportsEntitiesComponent } from './reports-entities/reports-entities.component';
import { ReportsAlertsComponent } from './reports-alerts/reports-alerts.component';
import { ReportsTransactionsComponent } from './reports-transactions/reports-transactions.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ],
  declarations: [ReportsComponent, ReportsHomeComponent, ReportsParticipantsComponent, ReportsIndividualsComponent, ReportsEntitiesComponent, ReportsAlertsComponent, ReportsTransactionsComponent]
})
export class ReportsModule { }
