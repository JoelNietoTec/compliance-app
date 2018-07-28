import { ParamCategoriesService } from './../../../shared/services/param-categories.service';
import { Component, OnInit } from '@angular/core';
import { ParamsService } from '../../../shared/services/params.service';
import { Observable } from 'rxjs';
import {
  Param,
  ParamMatrix,
  ParamCategory
} from '../../../shared/models/params.model';
import { UtilService } from '../../../shared/services/util.service';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';

@Component({
  selector: 'app-home-segments',
  templateUrl: './home-segments.component.html',
  styleUrls: ['./home-segments.component.css']
})
export class HomeSegmentsComponent implements OnInit {
  _params: Observable<Param[]>;
  _matrices: Observable<ParamMatrix[]>;
  _categories: Observable<ParamCategory[]>;
  _selectedMatrix: number;
  _selectedCategory: ParamCategory;
  _selectedParam: number;

  constructor(
    private _paramService: ParamsService,
    private _matrixService: ParamMatricesService,
    private _categoryService: ParamCategoriesService,
    private _util: UtilService
  ) {}

  ngOnInit() {
    this._matrices = this._matrixService.getMatrices();

    this._params = this._paramService.getParams().map(data => {
      data = this._util.sortBy(data, 'name');
      return data;
    });
  }

  selectMatrix(id: number) {
    this._selectedMatrix = id;
    this._selectedCategory = undefined;
    this._selectedParam = undefined;
    this._categories = this._categoryService
      .getCategoriesByMatrix(this._selectedMatrix)
      .map(data => {
        data = this._util.sortBy(data, 'name');
        return data;
      });
  }
}
