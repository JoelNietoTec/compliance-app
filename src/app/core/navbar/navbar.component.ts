import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/users.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  _loggedUSer: User;

  constructor(private _auth: AuthService) {}

  ngOnInit() {
    this._loggedUSer = this._auth.getUserInfo();
  }
}
