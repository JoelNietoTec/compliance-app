import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamTable, ParamValue, TableType } from '../../../shared/models/params.model';
import { UtilService } from '../../../shared/services/util.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-param-tables',
  templateUrl: 'param-tables.component.html',
  styleUrls: ['./param-tables.component.css']
})
export class ParamTablesComponent implements OnInit {
  _table: TableOptions = {};
  tables: Observable<ParamTable[]>;
  _tableTypes: TableType[];

  constructor(private _tablesService: ParamTablesService, private _util: UtilService, private toastr: ToastrService) {}

  ngOnInit() {
    this._table.title = 'Tablas';
    this._table.editable = true;
    this._table.creatable = true;
    this._table.detailsURL = [];
    this._table.addMethod = 'inline';
    this._table.style = 'table-sm table-squared';

    this._tableTypes = [
      {
        id: 1,
        name: 'Simple',
        englishName: 'Simple'
      },
      {
        id: 2,
        name: 'Complejo',
        englishName: 'Complex'
      }
    ];

    this._table.columns = [
      { name: 'name', title: 'Nombre', sortable: true, type: 'text', filterable: true },
      { name: 'englishName', title: 'Nombre Inglés', sortable: true, type: 'text' },
      {
        name: 'type',
        title: 'Tipo',
        sortable: true,
        type: 'object',
        list: this._tableTypes,
        listID: 'id',
        listDisplay: 'name',
        objectColumn: 'type.name',
        objectID: 'tableTypeId'
      },
      { name: 'createDate', title: 'Fec. Creación', sortable: true, type: 'date', readonly: true }
    ];
    this._table.pageable = true;

    this.tables = this._tablesService.getTables();
  }

  addTable(table: ParamTable) {
    this._tablesService.createTable(table).subscribe(
      data => {
        this.toastr.success(data.name, 'Tabla Creada');
        this.tables = this._tablesService.getTables();
      },
      (err: Error) => {
        this.toastr.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editTable(table: ParamTable) {
    this._tablesService.editTable(table.id, table).subscribe(
      data => {
        this.toastr.success(table.name, 'Tabla Editada');
      },
      (err: Error) => {
        this.toastr.error(err.message, 'Ocurrió un error');
      }
    );
  }

  deleteTable(id: number) {
    this._tablesService.deleteTable(id).subscribe(
      data => {
        this.toastr.info('Tabla eliminada');
      },
      (err: Error) => {
        this.toastr.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
