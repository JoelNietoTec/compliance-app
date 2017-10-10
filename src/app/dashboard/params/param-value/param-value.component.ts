import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ParamTable, ParamSubValue, ParamValue } from '../../../shared/models/params.model';
import { ParamTablesService } from '../../../shared/services/param-tables.service';

@Component({
  selector: 'param-value',
  templateUrl: './param-value.component.html',
  styleUrls: ['./param-value.component.css']
})

export class ParamValueComponent implements OnInit {
  @Input() _value: ParamValue;

  _newSubValue: ParamSubValue;
  _currentSubValue: ParamSubValue = {};
  _saving: Boolean = false;

  constructor(
    private _tableService: ParamTablesService,
    private toastr: ToastsManager
  ) {
    this._newSubValue = {};
  }

  ngOnInit() { }

  addValue() {
    this._newSubValue.ParamValueID = this._value.ID;
    this._tableService.addSubValue(this._newSubValue)
      .subscribe(data => {
        this.toastr.success(data.EnglishDisplayValue, 'Value added');
        this._value.ParamSubValues.push(data);
        this._newSubValue = {};
      });
  }

  selectValue(value: ParamSubValue) {
    this._currentSubValue = value;
  }

  cancelUpdate() {
    this._currentSubValue = {};
  }

  updateValue() {
    this._tableService.editSubValue(this._currentSubValue.ID, this._currentSubValue)
      .subscribe(data => {
        this.toastr.success(this._currentSubValue.EnglishDisplayValue, 'Value updated');
        this._currentSubValue = {};
      });
  }

}
