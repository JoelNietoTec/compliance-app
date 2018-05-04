import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ParamMatrix, MatrixType } from '../../../shared/models/params.model';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';
import { MatrixTypesService } from '../../../shared/services/matrix-types.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'app-param-matrices',
  templateUrl: './param-matrices.component.html',
  styleUrls: ['./param-matrices.component.css']
})
export class ParamMatricesComponent implements OnInit {
  _matrices: ParamMatrix[];
  _matrixTypes: MatrixType[];
  _table: TableOptions = {};

  constructor(
    private _matrixService: ParamMatricesService,
    private _typesService: MatrixTypesService,
    private toastr: ToastrService,
    private _util: UtilService
  ) {}

  ngOnInit() {
    this._table.addMethod = 'inline';
    this._table.creatable = true;
    this._table.editable = true;
    this._table.pageable = true
    this._table.detailsURL = [];
    this._table.style = 'table-sm table-squared';
    this._table.title = 'Matrices';

    this._matrixTypes = [
      {
        ID: 1,
        Name: 'Individuos',
        EnglishName: 'Individuals'
      },
      {
        ID: 2,
        Name: 'Entidades',
        EnglishName: 'Entities'
      }
    ];

    this._table.columns = [
      { name: 'Code', title: 'Código', type: 'text', sortable: true },
      { name: 'Name', title: 'Nombre', type: 'text', sortable: true },
      {
        name: 'MatrixType',
        title: 'Tipo',
        sortable: true,
        type: 'object',
        list: this._matrixTypes,
        listID: 'ID',
        listDisplay: 'Name',
        objectColumn: 'MatrixType.Name',
        objectID: 'MatrixTypeID'
      },
      { name: 'Description', title: 'Descripción', type: 'text', sortable: true },
      { name: 'CreateDate', title: 'Fec. Creación', type: 'datetime', readonly: true }
    ];

    this._matrixService.getMatrices().subscribe(data => {
      this._matrices = data;
    });
  }

  createMatrix(matrix: ParamMatrix) {
    matrix.CreateDate = new Date();
    this._matrixService.createMatrix(matrix).subscribe(data => {
      this.toastr.success(data.Name, 'Matriz creada');
      this._matrices.push(data);
    });
  }

  updateMatrix(matrix: ParamMatrix) {
    console.log(matrix);
    this._matrixService.updateMatrix(matrix.ID, matrix).subscribe(
      data => {
        this.toastr.success(matrix.Name, 'Matrix Updated');
      },
      (error: Error) => {
        this.toastr.error(error.message, error.name);
      }
    );
  }
}
