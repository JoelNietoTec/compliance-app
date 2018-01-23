import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ParamSubValue, ParamValue } from '../../../shared/models/params.model';
import { ParamSubValuesService } from '../../../shared/services/param-sub-values.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'param-value',
  templateUrl: './param-value.component.html',
  styleUrls: ['./param-value.component.css']
})
export class ParamValueComponent implements OnInit {
  @Input() _value: ParamValue;
  _table: TableOptions = {};

  constructor(
    private _util: UtilService,
    private _subValService: ParamSubValuesService,
    private toastr: ToastsManager
  ) {}

  ngOnInit() {
    this._table.addMethod = 'inline';
    this._table.creatable = true;
    this._table.deletable = true;
    this._table.editable = true;
    this._table.style = 'table-sm table-squared';
    this._table.searcheable = true;
    this._table.pageable = true;
    this._table.columns = [
      { name: 'DisplayValue', title: 'Nombre', type: 'text', sortable: true, filterable: true },
      { name: 'EnglishDisplayValue', title: 'Nombre Inglés', type: 'text', sortable: true, filterable: true },
      { name: 'Score', title: 'Valor', type: 'number', sortable: true }
    ];
  }

  addValue(value: ParamSubValue) {
    value.ParamValueID = this._value.ID;
    this._subValService.addSubValue(value).subscribe(data => {
      this.toastr.success(data.DisplayValue, 'Valor creado');
      this._value.ParamSubValues.push(data);
    });
  }

  updateValue(value: ParamSubValue) {
    this._subValService.editSubValue(value.ID, value).subscribe(data => {
      this.toastr.success(data.DisplayValue, 'Valor editado');
    });
  }

  deleteValue(id: number) {
    this._subValService.deleteSubValue(id).subscribe(data => {
      this.toastr.info('Valor eliminado');
    });
  }
}
