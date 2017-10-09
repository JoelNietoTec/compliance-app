import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantsComponent } from './participants.component';
import { ParticipantFormComponent } from './participant-form/participant-form.component';
import { ParticipantsListComponent } from './participants-list/participants-list.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';

export const routes: Routes = [
  {
    path: '',
    component: ParticipantsComponent,
    children: [
      {
        path: '',
        component: ParticipantsListComponent
      },
      {
        path: 'new',
        component: ParticipantFormComponent
      },
      {
        path: ':id',
        component: ParticipantDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantsRoutingModule { }

export const routedComponents = [
  ParticipantsComponent,
  ParticipantsListComponent,
  ParticipantDetailsComponent
];
