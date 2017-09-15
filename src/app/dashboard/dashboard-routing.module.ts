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
        loadChildren: () => getHomeModule()
      },
      {
        path: 'Participants',
        canActivateChild: [AuthGuard],
        loadChildren: () => getParticipantsModule()
      },
      {
        path: 'Params',
        canActivateChild: [AuthGuard],
        loadChildren: () => getParamsModule()
      },
      {
        path: 'Users',
        canActivateChild: [AuthGuard],
        loadChildren: () => getUsersModule()

      },
      {
        path: 'Settings',
        canActivateChild: [AuthGuard],
        loadChildren: () => SettingsModule
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
