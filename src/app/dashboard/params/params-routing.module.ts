import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParamsComponent } from './params.component';
import { ParamMatricesComponent } from './param-matrices/param-matrices.component';
import { ParamMatrixComponent } from './param-matrix/param-matrix.component';
import { ParamMatrixDetailsComponent } from './param-matrix-details/param-matrix-details.component';
import { ParamTablesComponent } from './param-tables/param-tables.component';
import { ParamTableComponent } from './param-table/param-table.component';


export const routes: Routes = [
  {
    path: '',
    component: ParamsComponent,
    children: [
      {
        path: 'matrices', component: ParamMatricesComponent
      },
      {
        path: 'tablas', component: ParamTablesComponent
      },
      {
        path: 'tablas/:id', component: ParamTableComponent
      },
      {
        path: 'matrices/:id', component: ParamMatrixComponent
      },
      {
        path: 'matrices/:id/editar', component: ParamMatrixComponent
      },
      {
        path: '**', pathMatch: 'full', redirectTo: 'matrices'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParamsRoutingModule { }

export const routedComponents = [
  ParamsComponent,
  ParamMatricesComponent,
  ParamTablesComponent,
  ParamMatrixComponent,
  ParamMatrixDetailsComponent
];
