import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ParamTable, ParamCategory, ParamMatrix } from '../../../shared/models/params.model';
import { ParamCategoriesService } from '../../../shared/services/param-categories.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'param-categories',
  templateUrl: './param-categories.component.html',
  styleUrls: ['./param-categories.component.css']
})
export class ParamCategoriesComponent implements OnInit {
  @Input() matrixID: number;

  _table: TableOptions = {};
  _tables: ParamTable[];
  _categories: ParamCategory[];
  _newCategory: ParamCategory;
  _currentCategory: ParamCategory;
  _newCategories: ParamCategory[] = [];

  constructor(private _categoriesService: ParamCategoriesService, private toast: ToastrService) {}

  ngOnInit() {
    this._table.columns = [
      { name: 'name', title: 'Nombre', sortable: true, filterable: true },
      { name: 'englishName', title: 'Nombre Inglés', sortable: true, filterable: true },
      { name: 'weighting', title: 'Ponderación', sortable: true }
    ];

    this._table.editable = true;
    this._table.deletable = true;
    this._table.style = 'table-sm table-squared';
    this._table.addMethod = 'inline';
    this.getCategories();
  }

  getCategories() {
    this._categoriesService.getCategoriesByMatrix(this.matrixID).subscribe(data => {
      this._categories = data;
    });
  }

  addCategory(cat: ParamCategory) {
    cat.paramMatrixId = this.matrixID;
    this._categoriesService.createCategory(cat).subscribe(data => {
      this.toast.success(data.name, 'Categoría creada exitosamente');
      this._categories.push(data);
      console.log(this._categories);
    });
  }

  editCategory(cat: ParamCategory) {
    this._categoriesService.editCategory(cat.id, cat).subscribe(data => {
      this.toast.success(cat.name, 'Categoría editada exitosamente');
    });
  }
}
