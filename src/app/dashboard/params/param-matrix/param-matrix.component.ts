import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParamMatrix, ParamCategory, ParamTable, ParamValue } from '../../../shared/models/params.model';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';
import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamCategoriesService } from '../../../shared/services/param-categories.service';

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
    private _tableService: ParamTablesService
  ) { }

  ngOnInit() {
    this.initMatrix();
    this._newCategory = {};
    this._tableService.getTables()
      .subscribe(data => {
        this._tables = data;
      });
  }

  initMatrix() {
    this._route.params.subscribe(params => {
      this._matrixService.getMatrix(params['id'])
        .subscribe(data => {
          this._matrix = data;
          this.getCategories();
          console.log(this._matrix);
          if (this._matrix.ParamCategories) {
            this.calculatePercent();
          }
        });
    });
  }

  getCategories() {
    this._categoryService.getCategoriesByMatrix(this._matrix.ID)
      .subscribe(data => {
        this._categories = data;
      });
  }

  addCategory() {
    console.log(this._newCategory);
    this._newCategory.ParamMatrixID = this._matrix.ID;
    this._newCategories.push(this._newCategory);
    this.calculatePercent();
    this._newCategory = {};
  }

  calculatePercent() {
    this._totalPercent = 0;
    if (this._matrix.ParamCategories) {
      this._matrix.ParamCategories.forEach(element => {
        this._totalPercent = this._totalPercent + element.Weighting;
      });
    }

    this._newCategories.forEach(element => {
      this._totalPercent = this._totalPercent + element.Weighting;
    });

  }

  saveCategories() {
    this._newCategories.forEach(element => {
      this._categoryService.createCategory(element)
        .subscribe(data => {
          console.log(data);
          this.initMatrix();
          this._newCategories = [];
        });
    });
  }

}
