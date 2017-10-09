import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './home/home.module';
import { ParticipantsModule } from './participants/participants.module';
import { ParamsModule } from './params/params.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from '../shared/services/auth.guard';
import { SettingsModule } from './settings/settings.module';

export function getParticipantsModule() {
  return ParticipantsModule;
}

export function getParamsModule() {
  return ParamsModule;
}

export function getUsersModule() {
  return UsersModule;
}

export function getHomeModule() {
  return HomeModule;
}
export const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Home',
        canActivateChild: [AuthGuard],
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'Participants',
        canActivateChild: [AuthGuard],
        loadChildren:  './participants/participants.module#ParticipantsModule'
      },
      {
        path: 'Params',
        canActivateChild: [AuthGuard],
        loadChildren:  './params/params.module#ParamsModule'
      },
      {
        path: 'Users',
        canActivateChild: [AuthGuard],
        loadChildren:  './users/users.module#UsersModule'

      },
      {
        path: 'Settings',
        canActivateChild: [AuthGuard],
        loadChildren:  './settings/settings.module#SettingsModule'
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'Home'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }

export const routedComponents = [DashboardComponent];
