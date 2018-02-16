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
import { DiscardsModule } from './discards/discards.module';
import {TasksModule} from './tasks/tasks.module';

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
        path: 'home',
        canActivateChild: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'participantes',
        canActivateChild: [AuthGuard],
        loadChildren: './participants/participants.module#ParticipantsModule'
      },
      {
        path: 'tareas',
        canActivateChild: [AuthGuard],
        loadChildren: './tasks/tasks.module#TasksModule'
      },
      {
        path: 'parametros',
        canActivateChild: [AuthGuard],
        loadChildren: './params/params.module#ParamsModule'
      },
      {
        path: 'usuarios',
        canActivateChild: [AuthGuard],
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'descartes',
        canActivateChild: [AuthGuard],
        loadChildren: './discards/discards.module#DiscardsModule'
      },
      {
        path: 'ajustes',
        canActivateChild: [AuthGuard],
        component: SettingsComponent
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

export const routedComponents = [DashboardComponent];
