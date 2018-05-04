import { Component, OnInit, Input } from '@angular/core';
import { ParamCategory, ParamTable, Param } from '../../../shared/models/params.model';
import { ToastrService } from 'ngx-toastr';

import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamsService } from '../../../shared/services/params.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  moduleId: module.id,
  selector: 'param-category',
  templateUrl: './param-category.component.html',
  styleUrls: ['./param-category.component.css']
})
export class ParamCategoryComponent implements OnInit {
  @Input() category: ParamCategory;
  @Input() tables: ParamTable[];

  _param: Param;
  _header;
  _customTable: TableOptions = {};

  constructor(private _paramService: ParamsService, private toastr: ToastrService) {
    this._param = {};
  }

  ngOnInit() {
    this._header = `${this.category.Name} / ${this.category.Weighting} %`;
    this._customTable.columns = [
      { name: 'Name', title: 'Nombre', sortable: true, filterable: true },
      { name: 'EnglishName', title: 'Nombre Inglés', sortable: true, filterable: true },
      { name: 'Description', title: 'Descripción', sortable: true, filterable: true },
      { name: 'Weighting', title: 'Ponderación', type: 'decimal', sortable: true },
      {
        name: 'ParamTable',
        title: 'Tabla',
        type: 'object',
        list: this.tables,
        listID: 'ID',
        objectColumn: 'ParamTable.Name',
        listDisplay: 'Name',
        objectID: 'ParamTableID'
      }
    ];
    this._customTable.creatable = true;
    this._customTable.editable = true;
    this._customTable.addMethod = 'inline';
    this._customTable.style = 'table-sm table-squared';
  }

  addParam(param: Param) {
    param.ParamCategoryID = this.category.ID;
    this._paramService.addParams(param).subscribe(data => {
      this.toastr.success(param.Name, 'Parámetro creado');
      this.category.Params.push(data);
    });
  }

  editParam(param: Param) {
    this._paramService.editParam(param.ID, param).subscribe(data => {
      this.toastr.success(param.Name, 'Parámetro actualizado');
    });
  }

  deleteParam(id: number) {
    this._paramService.deleteParam(id).subscribe(data => {
      this.toastr.info('Parámetro eliminado');
    });
  }
}
