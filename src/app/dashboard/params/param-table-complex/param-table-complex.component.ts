import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private _tableService: ParamTablesService, private _valueService: ParamValuesService, private toastr: ToastrService) {}

  ngOnInit() {
    this._valueService.getValuesByTable(this.table.id).subscribe(data => {
      this._values = data;
    });
  }

  onSubmit() {
    this._newValue.paramTableId = this.table.id;
    this._valueService.addValue(this._newValue).subscribe(data => {
      this.toastr.success(data.displayValue, 'Categoría creada');
      data.subValues = [];
      this._values.push(data);
      this._newValue = {};
    });
  }
}
