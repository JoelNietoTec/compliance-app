import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamValuesService } from '../../../shared/services/param-values.service';
import { UtilService } from '../../../shared/services/util.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ParamTable, ParamValue } from '../../../shared/models/params.model';
import { Observable } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'param-table-simple',
  templateUrl: './param-table-simple.component.html',
  styleUrls: ['./param-table-simple.component.css']
})
export class ParamTableSimpleComponent implements OnInit {
  @Input() table: ParamTable;

  _values: Observable<ParamValue[]>;
  _customTable: TableOptions = {};

  constructor(
    private _tableService: ParamTablesService,
    private _valueServ: ParamValuesService,
    private toastr: ToastrService,
    private _util: UtilService
  ) {}

  ngOnInit() {
    this._customTable.addMethod = 'modal';
    this._customTable.editable = true;
    this._customTable.creatable = true;
    this._customTable.deletable = true;
    this._customTable.pageable = true;
    this._customTable.searcheable = true;
    this._customTable.style = 'table-sm table-squared';
    this._customTable.columns = [
      { name: 'displayValue', title: 'Nombre', sortable: true, filterable: true },
      { name: 'englishDisplayValue', title: 'Nombre Inglés', sortable: true, filterable: true },
      { name: 'score', title: 'Puntaje', sortable: true, type: 'number' }
    ];

    this._values = this._valueServ.getValuesByTable(this.table.id);
  }

  addValue(value: ParamValue) {
    value.paramTableId = this.table.id;
    this._valueServ.addValue(value).subscribe(
      data => {
        this.toastr.success(data.displayValue, 'Valor creado');
        this._values = this._valueServ.getValuesByTable(this.table.id);
      },
      (err: Error) => {
        this.toastr.error(err.message, 'No se pudo crear el valor');
      }
    );
  }

  editValue(value: ParamValue) {
    this._valueServ.editValue(value.id, value).subscribe(data => {
      this.toastr.success(value.displayValue, 'Valor editado');
      this._values = this._valueServ.getValuesByTable(this.table.id);
    });
  }

  deleteValue(id: number) {
    this._valueServ.deleteValue(id).subscribe(data => {
      this.toastr.info('Valor eliminado');
      this._values = this._valueServ.getValuesByTable(this.table.id);
    });
  }
}
