import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/users.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  _loggedUser: User;

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit() {
    this._loggedUser = this._auth.getUserInfo();
  }

}
