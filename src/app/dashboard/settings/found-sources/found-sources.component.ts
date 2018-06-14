import { Component, OnInit } from '@angular/core';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { TransactionSource } from '../../../shared/models/profiles.model';
import { TransactionsService } from '../../../shared/services/transactions.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-found-sources',
  templateUrl: './found-sources.component.html',
  styleUrls: ['./found-sources.component.css']
})
export class FoundSourcesComponent implements OnInit {
  _table: TableOptions = {};
  _sources: Observable<TransactionSource[]>;

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
      { name: 'id', title: '#', hidden: true },
      { name: 'name', title: 'Nombre', filterable: true },
      { name: 'englishName', title: 'Nombre Inglés', filterable: true }
    ];

    this._sources = this._tranServ.getSources();
  }

  addSource(source: TransactionSource) {
    this._tranServ.createSource(source).subscribe(
      data => {
        this.toast.success(data.name, 'Fuente agregada');
        this._sources = this._tranServ.getSources();
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrio error');
      }
    );
  }

  editSource(source: TransactionSource) {
    this._tranServ.editSource(source.id, source).subscribe(
      data => {
        this.toast.success(source.name, 'Fuente actualizada');
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
