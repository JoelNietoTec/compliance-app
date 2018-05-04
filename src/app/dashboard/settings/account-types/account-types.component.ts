import { Component, OnInit } from '@angular/core';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { AccountType } from '../../../shared/models/profiles.model';
import { ProfileAccountsService } from '../../../shared/services/profile-accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-types',
  templateUrl: './account-types.component.html',
  styleUrls: ['./account-types.component.css']
})
export class AccountTypesComponent implements OnInit {
  _table: TableOptions = {};
  _types: AccountType[];

  constructor(private _typeServ: ProfileAccountsService, private toast: ToastrService) {}

  ngOnInit() {
    this._table.title = 'Tipos Producto';
    this._table.pageable = true;
    this._table.editable = true;
    this._table.addMethod = 'inline';
    this._table.searcheable = true;
    this._table.style = 'table-squared';
    this._table.deletable = true;
    this._table.columns = [
      { name: 'ID', title: '#', hidden: true },
      { name: 'Name', title: 'Nombre', filterable: true },
      { name: 'EnglishName', title: 'Nombre Inglés', filterable: true }
    ];

    this._typeServ.getTypes().subscribe(data => {
      this._types = data;
    });
  }

  addType(type: AccountType) {
    this._typeServ.addType(type).subscribe(
      data => {
        this.toast.success(data.Name, 'Producto agregada');
        this._types.push(data);
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editType(type: AccountType) {
    this._typeServ.editType(type.ID, type).subscribe(
      data => {
        this.toast.success(type.Name, 'Producto actualizada');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  deleteType(id: number) {
    this._typeServ.deleteType(id).subscribe(
      data => {
        this.toast.info('Producto eliminado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrión un error');
      }
    );
  }
}
