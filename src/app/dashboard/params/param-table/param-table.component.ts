import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamTable, ParamValue } from '../../../shared/models/params.model';

@Component({
  moduleId: module.id,
  selector: 'app-param-table',
  templateUrl: 'param-table.component.html',
  styleUrls: ['./param-table.component.css']
})

export class ParamTableComponent implements OnInit {

  _table: ParamTable;
  _values: Array<ParamValue>;
  _newValue: ParamValue;
  _currentValue: ParamValue;
  _saving: boolean = false;
  _editing: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _tableService: ParamTablesService
  ) { }

  ngOnInit() {
    this.initTable();
    this._newValue = {};
    this._currentValue = {};
    this._editing = false;
  }

  initTable() {
    this._table = {};
    this._route.params.subscribe(params => {
      this._tableService.getTable(params['id'])
        .subscribe(data => {
          this._table = data;
        });
    });
  }

}
