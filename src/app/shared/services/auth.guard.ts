import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      console.log(localStorage.getItem('currentUser'));
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
