import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { ParticipantsModule } from './participants/participants.module';
import { ParticipantsComponent } from './participants/participants.component';
import { ParamsModule } from './params/params.module';
import { ParamsComponent } from './params/params.component';
import { UsersModule } from './users/users.module';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { SettingsModule } from './settings/settings.module';
import { SettingsComponent } from './settings/settings.component';


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
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'participants',
        canActivateChild: [AuthGuard],
        loadChildren: './participants/participants.module#ParticipantsModule'
      },
      {
        path: 'params',
        canActivateChild: [AuthGuard],
        loadChildren: './params/params.module#ParamsModule'
      },
      {
        path: 'users',
        canActivateChild: [AuthGuard],
        component: UsersComponent
      },
      {
        path: 'settings',
        canActivateChild: [AuthGuard],
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }

export const routedComponents = [DashboardComponent];
