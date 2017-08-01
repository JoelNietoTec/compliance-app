import { Component, OnInit, Input } from '@angular/core';

import { ParamTable, ParamCategory, ParamMatrix } from '../../../shared/models/params.model';
import { ParamCategoriesService } from '../../../shared/services/param-categories.service';

@Component({
  selector: 'param-categories',
  templateUrl: './param-categories.component.html',
  styleUrls: ['./param-categories.component.css']
})

export class ParamCategoriesComponent implements OnInit {
  @Input() matrix: ParamMatrix;

  _tables: ParamTable[];
  _newCategory: ParamCategory;
  _newCategories: ParamCategory[] = [];

  constructor(
    private _categoriesService: ParamCategoriesService
  ) { }

  ngOnInit() {
    this._newCategory = {};
    console.log(this.matrix);
  }

  addCategory() {
    this._newCategory.ParamMatrixID = this.matrix.ID;
    this._categoriesService.createCategory(this._newCategory)
      .subscribe(data => {
        this.matrix.ParamCategories.push(data);
        this._newCategory = {};
      });
  }
}
