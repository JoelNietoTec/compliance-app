import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { ParticipantAlertsService } from './participant-alerts.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ParticipantAlert } from '../models/alerts.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _alertServ: ParticipantAlertsService,
    private _authServ: AuthService,
    protected localStorage: AsyncLocalStorage
  ) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this._authServ.initLocalInfo();
      this.getAlerts();
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild() {
    // return true;

    if (localStorage.getItem('currentUser')) {
      this._authServ.initLocalInfo();
      this.getAlerts();
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  getAlerts() {
    this.localStorage.getItem<ParticipantAlert[]>('alerts').subscribe(alerts => {
      if (alerts) {
        this._alertServ.updateLastAlerts();
      } else {
        this._alertServ.initAlerts();
      }
    });
  }
}
