import { Component, OnInit, Input } from '@angular/core';

import { ParamMatrix, ParamTable } from '../../../shared/models/params.model';
import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'param-items',
  templateUrl: './param-items.component.html'
})

export class ParamItemsComponent implements OnInit {
  @Input() matrix: ParamMatrix;

  _tables: ParamTable[];

  constructor(
    private _tableService: ParamTablesService,
    private _util: UtilService
  ) { }

  ngOnInit() {
    this._tableService.getTables()
      .subscribe(data => {
        this._tables = this._util.sortBy(data, 'englishName');
      });
   }
}
