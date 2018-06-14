import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ParamMatrix, MatrixType } from '../../../shared/models/params.model';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';
import { MatrixTypesService } from '../../../shared/services/matrix-types.service';
import { UtilService } from '../../../shared/services/util.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-param-matrices',
  templateUrl: './param-matrices.component.html',
  styleUrls: ['./param-matrices.component.css']
})
export class ParamMatricesComponent implements OnInit {
  _matrices: Observable<ParamMatrix[]>;
  _matrixTypes: MatrixType[];
  _table: TableOptions = {};

  constructor(
    private _matrixService: ParamMatricesService,
    private _typesService: MatrixTypesService,
    private toastr: ToastrService,
    private _util: UtilService
  ) {}

  ngOnInit() {
    this._table.addMethod = 'modal';
    this._table.creatable = true;
    this._table.editable = true;
    this._table.pageable = true;
    this._table.detailsURL = [];
    this._table.style = 'table-sm table-squared';
    this._table.title = 'Matrices';

    this._matrixTypes = [
      {
        id: 1,
        name: 'Individuos',
        englishName: 'Individuals'
      },
      {
        id: 2,
        name: 'Entidades',
        englishName: 'Entities'
      }
    ];

    this._table.columns = [
      { name: 'code', title: 'Código', sortable: true },
      { name: 'name', title: 'Nombre', sortable: true },
      {
        name: 'type',
        title: 'Tipo',
        sortable: true,
        type: 'object',
        list: this._matrixTypes,
        listID: 'id',
        listDisplay: 'name',
        objectColumn: 'type.name',
        objectID: 'matrixTypeId'
      },
      { name: 'description', title: 'Descripción', type: 'text', sortable: true },
      { name: 'createDate', title: 'Fec. Creación', type: 'datetime', readonly: true }
    ];

    this._matrices = this._matrixService.getMatrices();
  }

  createMatrix(matrix: ParamMatrix) {
    matrix.createDate = new Date();
    this._matrixService.createMatrix(matrix).subscribe(
      data => {
        this.toastr.success(data.name, 'Matriz creada');
        this._matrices = this._matrixService.getMatrices();
      },
      (err: Error) => {
        this.toastr.error(err.message, err.name);
      }
    );
  }

  updateMatrix(matrix: ParamMatrix) {
    this._matrixService.updateMatrix(matrix.id, matrix).subscribe(
      data => {
        this._matrices = this._matrixService.getMatrices();
        this.toastr.success(matrix.name, 'Matrix Updated');
      },
      (error: Error) => {
        this.toastr.error(error.message, error.name);
      }
    );
  }
}
