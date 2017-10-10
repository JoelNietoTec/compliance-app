import { Component, OnInit, Input } from '@angular/core';

import { ParamTable, ParamCategory, ParamMatrix } from '../../../shared/models/params.model';
import { ParamCategoriesService } from '../../../shared/services/param-categories.service';

@Component({
  selector: 'param-categories',
  templateUrl: './param-categories.component.html',
  styleUrls: ['./param-categories.component.css']
})

export class ParamCategoriesComponent implements OnInit {
  @Input() matrixID: number;

  _tables: Array<ParamTable>;
  _categories: Array<ParamCategory>;
  _newCategory: ParamCategory;
  _newCategories: ParamCategory[] = [];

  constructor(
    private _categoriesService: ParamCategoriesService
  ) { }

  ngOnInit() {
    this._newCategory = {};
    this.getCategories();
  }

  getCategories() {
    this._categoriesService.getCategoriesByMatrix(this.matrixID)
      .subscribe(data => {
        this._categories = data;
      });
  }

  addCategory() {
    this._newCategory.ParamMatrixID = this.matrixID;
    this._categoriesService.createCategory(this._newCategory)
      .subscribe(data => {
        this._categories.push(data);
        this._newCategory = {};
      });
  }
}
