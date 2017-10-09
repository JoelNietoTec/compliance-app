import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthGuard } from './shared/services/auth.guard';

export function getDashboardModule() {
  return DashboardModule;
}

export function getAuthModule() {
  return AuthenticationModule;
}

export const routes: Routes = [
  {
    path: 'Dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'login',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'Dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [
  DashboardComponent,
  AuthenticationComponent
];
