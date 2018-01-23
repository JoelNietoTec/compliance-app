import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamTable, ParamValue, TableType } from '../../../shared/models/params.model';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'app-param-tables',
  templateUrl: 'param-tables.component.html',
  styleUrls: ['./param-tables.component.css']
})
export class ParamTablesComponent implements OnInit {
  _table: TableOptions = {};
  tables: Array<ParamTable>;
  _tableTypes: Array<TableType>;

  constructor(private _tablesService: ParamTablesService, private _util: UtilService, private toastr: ToastsManager) {}

  ngOnInit() {
    this._table.title = 'Tablas';
    this._table.editable = true;
    this._table.creatable = true;
    this._table.detailsURL = [];
    this._table.addMethod = 'inline';
    this._table.style = 'table-sm table-squared';

    this._tableTypes = [
      {
        ID: 1,
        Name: 'Simple',
        EnglishName: 'Simple'
      },
      {
        ID: 2,
        Name: 'Complejo',
        EnglishName: 'Complex'
      }
    ];

    this._table.columns = [
      { name: 'Name', title: 'Nombre', sortable: true, type: 'text', filterable: true },
      { name: 'EnglishName', title: 'Nombre Inglés', sortable: true, type: 'text' },
      {
        name: 'TableType',
        title: 'Tipo',
        sortable: true,
        type: 'object',
        list: this._tableTypes,
        listID: 'ID',
        listDisplay: 'Name',
        objectColumn: 'TableType.Name',
        objectID: 'TableTypeID'
      },
      { name: 'CreateDate', title: 'Fec. Creación', sortable: true, type: 'date', readonly: true }
    ];

    this._tablesService.getTables().subscribe(data => {
      this.tables = data;
    });
  }

  addTable(table: ParamTable) {
    this._tablesService.createTable(table).subscribe(data => {
      this.toastr.success(data.Name, 'Tabla Creada');
      this.tables.push(data);
    });
  }

  editTable(table: ParamTable) {
    this._tablesService.editTable(table.ID, table).subscribe(data => {
      this.toastr.success(data.Name, 'Tabla Editada');
    });
  }

  deleteTable(id: number) {
    this._tablesService.deleteTable(id).subscribe(data => {
      this.toastr.info('Tabla eliminada');
      this.tables = this._util.removeByID(this.tables, id);
    });
  }
}
