import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authServ: AuthService
  ) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this._authServ.initLocalInfo();
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild() {
    return true;
  }
}
