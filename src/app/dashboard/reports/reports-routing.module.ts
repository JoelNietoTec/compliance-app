import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsParticipantsComponent } from './reports-participants/reports-participants.component';
import { ReportsAlertsComponent } from './reports-alerts/reports-alerts.component';
import { ReportsTransactionsComponent } from './reports-transactions/reports-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      { path: '', component: ReportsHomeComponent },
      { path: 'participantes', component: ReportsParticipantsComponent },
      { path: 'alertas', component: ReportsAlertsComponent },
      { path: 'transacciones', component: ReportsTransactionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}

export const routedComponents = [
  ReportsComponent,
  ReportsHomeComponent,
  ReportsParticipantsComponent,
  ReportsAlertsComponent,
  ReportsTransactionsComponent
];
