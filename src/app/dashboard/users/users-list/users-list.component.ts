import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../shared/services/users.service';
import { User, UserProfile } from '../../../shared/models/users.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  _users: Array<User>;
  _table: TableOptions = {};
  _profiles: UserProfile[];

  constructor(private _userServ: UserService, private toast: ToastrService) {}

  ngOnInit() {
    this._profiles = [
      { ID: 1, Name: 'Administrador', EnglishName: 'Administrator' },
      { ID: 2, Name: 'Usuario', EnglishName: 'User' },
      { ID: 3, Name: 'Pruebas', EnglishName: 'Test' }
    ];

    this._table.columns = [
      { name: 'ID', title: '#', sortable: true, filterable: true, readonly: true },
      { name: 'UserName', title: 'Nombre', sortable: true, filterable: true },
      {
        name: 'UserProfile',
        title: 'Rol',
        type: 'object',
        objectColumn: 'UserProfile.Name',
        objectID: 'UserProfileID',
        list: this._profiles,
        listID: 'ID',
        listDisplay: 'Name'
      },
      { name: 'Email', title: 'Email', sortable: true, filterable: true },
      { name: 'CreateDate', title: 'Fecha Creación', type: 'datetime', sortable: true, readonly: true }
    ];

    this._table.style = 'table-sm table-squared';

    this._table.pageable = true;

    this._table.editable = true;

    this._table.addMethod = 'modal';

    this._table.searcheable = true;

    this._table.newURL = ['nuevo'];

    this._table.title = 'Usuarios';

    this._table.showTitle = true;

    this._userServ.getUsers().subscribe(data => {
      this._users = data;
    });
  }

  updateUser(user: User) {
    this._userServ.updateUser(user.ID, user).subscribe(
      data => {
        this.toast.success(data.UserName, 'Usuario actualizado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  deleteUser(id: number) {
    this._userServ.deleteUser(id).subscribe(
      data => {
        this.toast.info('Usuario eliminado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
