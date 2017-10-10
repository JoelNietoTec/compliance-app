import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
  _newTable: ParamTable = {};
  _saving: boolean = false;

  constructor(
    private _tablesService: ParamTablesService,
    private _util: UtilService,
    private toastr: ToastsManager
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
    this._newTable.CreateDate = new Date();
    this._newTable.TableTypeID = this._newTable.TableType.ID;
    console.log(this._newTable);
    this._tablesService.createtable(this._newTable)
      .subscribe(data => {
        data.TableType = this._util.filterByID(this._tableTypes, data.TableTypeID);
        this.tables.push(data);
        this._newTable = {};
        this._saving = false;
      });
  }

  createTable() {
    this._saving = true;
    this._newTable.CreateDate = new Date();
    this._tablesService.createtable(this._newTable)
      .subscribe(data => {
        this.toastr.success(data.EnglishName, 'Table Created');
        data.TableType = this._util.filterByID(this._tableTypes, data.TableTypeID);
        this.tables.push(data);
        this._newTable = {};
        this._saving = false;
      });
  }

  addTable() {
    this._showNewTable = !this._showNewTable;
  }
}
