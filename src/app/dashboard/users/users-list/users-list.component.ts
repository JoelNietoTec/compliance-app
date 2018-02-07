import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../shared/services/users.service';
import { User } from '../../../shared/models/users.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  _users: Array<User>;
  _table: TableOptions = {};

  constructor(private _userServ: UserService) {}

  ngOnInit() {
    this._table.columns = [
      { name: 'ID', title: '#', sortable: true, filterable: true },
      { name: 'UserName', title: 'Nombre Usuario', sortable: true, filterable: true },
      { name: 'Email', title: 'Email', sortable: true, filterable: true },
      { name: 'CreateDate', title: 'Fecha Creación', type: 'datetime', sortable: true }
    ];

    this._table.style = 'table-sm table-squared';

    this._table.pageable = true;

    this._table.searcheable = true;

    this._table.newURL = ['nuevo'];

    this._table.title = 'Usuarios';

    this._userServ.getUsers().subscribe(data => {
      this._users = data;
    });
  }
}
