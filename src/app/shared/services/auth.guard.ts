import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { ParticipantAlertsService } from './participant-alerts.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ParticipantAlert } from '../models/alerts.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _alertServ: ParticipantAlertsService,
    private _authServ: AuthService,
    protected localStorage: LocalStorage
  ) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this._authServ.initLocalInfo();
      // this.getAlerts();
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild() {
    if (localStorage.getItem('currentUser')) {
      this._authServ.initLocalInfo();
      // this.getAlerts();
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
