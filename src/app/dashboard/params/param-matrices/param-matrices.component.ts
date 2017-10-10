import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ParamMatrix, MatrixType } from '../../../shared/models/params.model';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';
import { MatrixTypesService } from '../../../shared/services/matrix-types.service';

@Component({
  selector: 'app-param-matrices',
  templateUrl: './param-matrices.component.html',
  styleUrls: ['./param-matrices.component.css']
})
export class ParamMatricesComponent implements OnInit {
  _showNewMatrix: boolean;
  matrices: ParamMatrix[];
  _newMatrix: ParamMatrix = {};
  _currentMatrix: ParamMatrix = {};
  matrixTypes: MatrixType[];

  constructor(
    private _matrixService: ParamMatricesService,
    private _typesService: MatrixTypesService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this._matrixService.getMatrices()
      .subscribe(data => {
        this.matrices = data;
      });

    this._typesService.getMatrixTypes()
      .subscribe(data => {
        this.matrixTypes = data;
      });
  }

  onSubmit() {
    this._newMatrix.CreateDate = new Date();
    console.log(this._newMatrix);
    this._matrixService.createMatrix(this._newMatrix)
      .subscribe(data => {
        console.log(data);
        this.matrices.push(data);
        console.log(this.matrices);
        this._newMatrix = {};
      });
  }

  createMatrix() {
    this._newMatrix.CreateDate = new Date();
    console.log(this._newMatrix);
    this._matrixService.createMatrix(this._newMatrix)
      .subscribe(data => {
        this.toastr.success(data.Name, 'Matrix Created');
        this.matrices.push(data);
        this._newMatrix = {};
      });
  }

  selectMatrix(matrix: ParamMatrix) {
    this._currentMatrix = matrix;
    console.log(this._currentMatrix);
  }

  updateMatrix() {
    console.log(this._currentMatrix);
    this._matrixService.updateMatrix(this._currentMatrix.ID, this._currentMatrix)
      .subscribe(data => {
        this.toastr.success(this._currentMatrix.Name, 'Matrix Updated');
        this._currentMatrix = {};
      },
      (error: Error) => {
        this.toastr.error(error.message, error.name);
      });
  }

  cancelUpdate() {
    this._currentMatrix = {};
  }

  addMatrix() {
    this._showNewMatrix = !this._showNewMatrix;
  }
}
