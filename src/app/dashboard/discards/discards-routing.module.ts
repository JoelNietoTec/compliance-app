import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscardsComponent } from './discards.component';

const routes: Routes = [
  { path: '', component: DiscardsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscardsRoutingModule { }

export const routedComponents = [DiscardsComponent];
