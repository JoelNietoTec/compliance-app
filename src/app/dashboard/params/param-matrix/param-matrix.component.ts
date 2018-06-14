import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParamMatrix, ParamCategory, ParamTable, ParamValue } from '../../../shared/models/params.model';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';
import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamCategoriesService } from '../../../shared/services/param-categories.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  moduleId: module.id,
  selector: 'app-param-matrix',
  templateUrl: './param-matrix.component.html',
  styleUrls: ['./param-matrix.component.css']
})

export class ParamMatrixComponent implements OnInit {

  _matrix: ParamMatrix;
  _tables: Array<ParamTable>;
  _categories: Array<ParamCategory>;
  _newCategory: ParamCategory;
  _newCategories: Array<ParamCategory> = [];
  _totalPercent: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private _matrixService: ParamMatricesService,
    private _categoryService: ParamCategoriesService,
    private _tableService: ParamTablesService,
    private _util: UtilService
  ) { }

  ngOnInit() {
    this.initMatrix();
    this._newCategory = {};
    this._tableService.getTables()
      .subscribe(data => {
        this._tables = data;
        this._tables = this._util.sortBy(this._tables, 'Name');
      });
  }

  initMatrix() {
    this._route.params.subscribe(params => {
      this._matrixService.getMatrix(params['id'])
        .subscribe(data => {
          this._matrix = data;
          this.getCategories();
          if (this._matrix.paramCategories) {
            this.calculatePercent();
          }
        });
    });
  }

  getCategories() {
    this._categoryService.getCategoriesByMatrix(this._matrix.id)
      .subscribe(data => {
        this._categories = data;
      });
  }

  addCategory() {
    this._newCategory.paramMatrixId = this._matrix.id;
    this._newCategories.push(this._newCategory);
    this.calculatePercent();
    this._newCategory = {};
  }

  calculatePercent() {
    this._totalPercent = 0;
    if (this._matrix.paramCategories) {
      this._matrix.paramCategories.forEach(element => {
        this._totalPercent = this._totalPercent + element.weighting;
      });
    }

    this._newCategories.forEach(element => {
      this._totalPercent = this._totalPercent + element.weighting;
    });

  }

  saveCategories() {
    this._newCategories.forEach(element => {
      this._categoryService.createCategory(element)
        .subscribe(data => {
          this.initMatrix();
          this._newCategories = [];
        });
    });
  }

}
