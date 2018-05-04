import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/users.model';
import { ParticipantAlertsService } from '../../shared/services/participant-alerts.service';
import { ParticipantAlert } from '../../shared/models/alerts.model';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { UtilService } from '../../shared/services/util.service';

export interface UserAlert extends ParticipantAlert {
  Seen?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  _loggedUSer: User;
  _alerts: UserAlert[];
  _count: number = 0;

  constructor(
    private _auth: AuthService,
    protected localStorage: LocalStorage,
    private _util: UtilService,
    private _alertService: ParticipantAlertsService
  ) {}

  ngOnInit() {
    // this.localStorage.removeItem('alerts').subscribe(() => {
    //   console.log('Hi');
    // }, () => {});
    this._loggedUSer = this._auth.getUserInfo();
    this.localStorage.getItem<UserAlert[]>('alerts').subscribe(alerts => {
      this._alerts = this._util.sortBy(alerts, 'Date', true);
      this._alerts.forEach(alert => {
        if (!alert.Seen) {
          this._count = this._count + 1;
        }
      });
    });
  }

  hideAlert(alert: UserAlert) {
    this._count = this._count - 1;
    alert.Seen = true;
    this.localStorage.setItem('alerts', this._alerts).subscribe(() => {});
  }
}
