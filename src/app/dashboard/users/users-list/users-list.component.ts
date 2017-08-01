import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models/users.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  _users: Array<User>;

  constructor(
    private _userServ: UserService
  ) { }

  ngOnInit() {
    this._userServ.getUsers()
      .subscribe(data => {
        this._users = data;
      });

  }

}
