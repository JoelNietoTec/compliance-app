import { Component, OnInit } from '@angular/core';

import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamTable, ParamValue, TableType } from '../../../shared/models/params.model';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'app-param-tables',
  templateUrl: 'param-tables.component.html',
  styleUrls: ['./param-tables.component.css']
})

export class ParamTablesComponent implements OnInit {

  tables: ParamTable[];
  _tableTypes: TableType[];
  _showNewTable: boolean;
  newTable: ParamTable = {};
  _saving: boolean = false;

  constructor(
    private _tablesService: ParamTablesService,
    private _util: UtilService
  ) { }

  ngOnInit() {
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

    this._tablesService.getTables()
      .subscribe(data => {
        this.tables = this._util.sortBy(data, 'Name');
      });
  }

  onSubmit() {
    this._saving = true;
    this.newTable.CreateDate = new Date();
    this.newTable.TableTypeID = this.newTable.TableType.ID;
    console.log(this.newTable);
    this._tablesService.createtable(this.newTable)
      .subscribe(data => {
        data.TableType = this._util.filterByID(this._tableTypes, data.TableTypeID);
        this.tables.push(data);
        this.newTable = {};
        this._saving = false;
      });
  }

  addTable() {
    this._showNewTable = !this._showNewTable;
  }
}
