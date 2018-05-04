import { Component, OnInit } from '@angular/core';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { TransactionSource } from '../../../shared/models/profiles.model';
import { TransactionsService } from '../../../shared/services/transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-found-sources',
  templateUrl: './found-sources.component.html',
  styleUrls: ['./found-sources.component.css']
})
export class FoundSourcesComponent implements OnInit {
  _table: TableOptions = {};
  _sources: TransactionSource[];

  constructor(private _tranServ: TransactionsService, private toast: ToastrService) {}

  ngOnInit() {
    this._table.title = 'Origen Fondos';
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

    this._tranServ.getSources().subscribe(data => {
      this._sources = data;
    });
  }

  addSource(source: TransactionSource) {
    this._tranServ.createSource(source).subscribe(
      data => {
        this.toast.success(data.Name, 'Fuente agregada');
        this._sources.push(data);
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrio error');
      }
    );
  }

  editSource(source: TransactionSource) {
    this._tranServ.editSource(source.ID, source).subscribe(
      data => {
        this.toast.success(source.Name, 'Fuente actualizada');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  deleteSource(id: number) {
    this._tranServ.deleteSource(id).subscribe(
      data => {
        this.toast.info('Fuente eliminada');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
