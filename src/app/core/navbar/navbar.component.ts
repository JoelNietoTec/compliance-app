import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/users.model';
import { ParticipantAlertsService } from '../../shared/services/participant-alerts.service';
import { ParticipantAlert } from '../../shared/models/alerts.model';
import { AsyncLocalStorageModule, AsyncLocalStorage } from 'angular-async-local-storage';
import { UtilService } from '../../shared/services/util.service';

export interface UserAlert extends ParticipantAlert {
  Seen?: Boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  _loggedUSer: User;
  _alerts: UserAlert[];

  constructor(
    private _auth: AuthService,
    protected localStorage: AsyncLocalStorage,
    private _util: UtilService,
    private _alertService: ParticipantAlertsService
  ) {}

  ngOnInit() {
    this._loggedUSer = this._auth.getUserInfo();
    this.localStorage.getItem<UserAlert[]>('alerts').subscribe(alerts => {
      this._alerts = this._util.sortBy(alerts, 'Date', true);
      console.log(this._alerts);
    });
  }

  hideAlert(alert: UserAlert) {
    alert.Seen = true;
    this.localStorage.setItem('alerts', this._alerts).subscribe(() => {});
  }
}
