import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';
import { ReportsHomeComponent } from './reports-home/reports-home.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [{ path: '', component: ReportsHomeComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}

export const routedComponents = [ReportsComponent, ReportsHomeComponent];
