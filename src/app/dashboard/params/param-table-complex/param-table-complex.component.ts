import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamValuesService } from '../../../shared/services/param-values.service';
import { ParamTable, ParamValue, ParamSubValue } from '../../../shared/models/params.model';

@Component({
  moduleId: module.id,
  selector: 'param-table-complex',
  templateUrl: './param-table-complex.component.html',
  styleUrls: ['./param-table-complex.component.css']
})
export class ParamTableComplexComponent implements OnInit {
  @Input() table: ParamTable;

  _newValue: ParamValue = {};
  _currentValue: ParamValue;
  _saving: Boolean;
  _editing: Boolean;
  _values: Array<ParamValue>;

  constructor(private _tableService: ParamTablesService, private _valueService: ParamValuesService, private toastr: ToastsManager) {}

  ngOnInit() {
    this._valueService.getValuesByTable(this.table.ID).subscribe(data => {
      this._values = data;
    });
  }

  onSubmit() {
    this._newValue.ParamTableID = this.table.ID;
    this._valueService.addValue(this._newValue).subscribe(data => {
      this.toastr.success(data.DisplayValue, 'Categoría creada');
      this._values.push(data);
      this._newValue = {};
    });
  }
}
