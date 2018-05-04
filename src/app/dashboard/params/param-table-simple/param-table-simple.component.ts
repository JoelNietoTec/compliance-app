import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamValuesService } from '../../../shared/services/param-values.service';
import { UtilService } from '../../../shared/services/util.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ParamTable, ParamValue } from '../../../shared/models/params.model';

@Component({
  moduleId: module.id,
  selector: 'param-table-simple',
  templateUrl: './param-table-simple.component.html',
  styleUrls: ['./param-table-simple.component.css']
})
export class ParamTableSimpleComponent implements OnInit {
  @Input() table: ParamTable;

  _values: Array<ParamValue>;
  _customTable: TableOptions = {};

  constructor(
    private _tableService: ParamTablesService,
    private _valueServ: ParamValuesService,
    private toastr: ToastrService,
    private _util: UtilService
  ) {}

  ngOnInit() {
    this._customTable.addMethod = 'inline';
    this._customTable.editable = true;
    this._customTable.creatable = true;
    this._customTable.deletable = true;
    this._customTable.pageable = true;
    this._customTable.searcheable = true;
    this._customTable.style = 'table-sm table-squared';
    this._customTable.columns = [
      { name: 'DisplayValue', title: 'Nombre', sortable: true, type: 'text', filterable: true },
      { name: 'EnglishDisplayValue', title: 'Nombre Inglés', sortable: true, type: 'text', filterable: true },
      { name: 'Score', title: 'Puntaje', sortable: true, type: 'number' }
    ];

    this._valueServ.getValuesByTable(this.table.ID).subscribe(data => {
      this._values = data;
    });
  }

  addValue(value: ParamValue) {
    value.ParamTableID = this.table.ID;
    this._valueServ.addValue(value).subscribe(
      data => {
        this.toastr.success(data.DisplayValue, 'Valor creado');
        this._values.push(data);
      },
      (err: Error) => {
        this.toastr.error(err.message, 'No se pudo crear el valor');
      }
    );
  }

  editValue(value: ParamValue) {
    this._valueServ.editValue(value.ID, value).subscribe(data => {
      this.toastr.success(data.DisplayValue, 'Valor editado');
    });
  }

  deleteValue(id: number) {
    this._valueServ.deleteValue(id).subscribe(data => {
      this.toastr.info('Valor eliminado');
      this._values = this._util.removeByID(this._values, id);
    });
  }
}
