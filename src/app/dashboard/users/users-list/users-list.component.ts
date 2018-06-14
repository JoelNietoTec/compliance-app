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
      { id: 1, name: 'Administrador', englishName: 'Administrator' },
      { id: 2, name: 'Usuario', englishName: 'User' },
      { id: 3, name: 'Pruebas', englishName: 'Test' }
    ];

    this._table.columns = [
      { name: 'id', title: '#', sortable: true, filterable: true, readonly: true },
      { name: 'userName', title: 'Nombre', sortable: true, filterable: true },
      {
        name: 'userProfile',
        title: 'Rol',
        type: 'object',
        objectColumn: 'userProfile.name',
        objectID: 'userProfileID',
        list: this._profiles,
        listID: 'id',
        listDisplay: 'name'
      },
      { name: 'email', title: 'Email', sortable: true, filterable: true },
      { name: 'createDate', title: 'Fecha Creación', type: 'datetime', sortable: true, readonly: true }
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
    this._userServ.updateUser(user.id, user).subscribe(
      data => {
        this.toast.success(data.userName, 'Usuario actualizado');
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
