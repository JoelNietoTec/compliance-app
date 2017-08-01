import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ParamsRoutingModule } from './params-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ParamsComponent } from './params.component';
import { ParamCategoriesComponent } from './param-categories/param-categories.component';
import { ParamCategoryComponent } from './param-category/param-category.component';
import { ParamItemsComponent } from './param-items/param-items.component';
import { ParamMatricesComponent } from './param-matrices/param-matrices.component';
import { ParamMatrixComponent } from './param-matrix/param-matrix.component';
import { ParamMatrixDetailsComponent } from './param-matrix-details/param-matrix-details.component';
import { ParamTableComponent } from './param-table/param-table.component';
import { ParamTableComplexComponent } from './param-table-complex/param-table-complex.component';
import { ParamTableSimpleComponent } from './param-table-simple/param-table-simple.component';
import { ParamTablesComponent } from './param-tables/param-tables.component';
import { ParamValueComponent } from './param-value/param-value.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    ParamsRoutingModule
  ],
  exports: [],
  declarations: [
    ParamsComponent,
    ParamCategoriesComponent,
    ParamCategoryComponent,
    ParamItemsComponent,
    ParamMatricesComponent,
    ParamMatrixComponent,
    ParamMatrixDetailsComponent,
    ParamTableComponent,
    ParamTableComplexComponent,
    ParamTablesComponent,
    ParamTableSimpleComponent,
    ParamValueComponent
  ],
  providers: [],
})
export class ParamsModule { }
