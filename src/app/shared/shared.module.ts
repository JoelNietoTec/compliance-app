import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AgmCoreModule } from '@agm/core';
import { BreadcrumbsModule } from 'ng2-breadcrumbs';

// Model Services
import { GendersService } from './services/genders.service';
import { ParticipantsService } from './services/participants.service';
import { ParamMatricesService } from './services/param-matrices.service';
import { MatrixTypesService } from './services/matrix-types.service';
import { ParamCategoriesService } from './services/param-categories.service';
import { ConnectionService } from './services/connection.service';
import { ParamTablesService } from './services/param-tables.service';
import { ParamsService } from './services/params.service';
import { UtilService } from './services/util.service';
import { UserService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { DocumentsService } from './services/documents.service';
import { CountriesService } from './services/countries.service';
import { RelationshipsService } from './services/relationships.service';
import { TasksService } from './services/tasks.service';
import { SanctionsService } from './services/sanctions.service';
import { ParamValuesService } from './services/param-values.service';
import { ParamSubValuesService } from './services/param-sub-values.service';
import { AuthGuard } from './services/auth.guard';
import { MapsService } from './services/maps.service';
import { ComparisonsService } from './services/comparisons.service';
import { ScheduleService } from './services/schedules.service';

// Components
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { CardComponent } from './components/card/card.component';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { QuickCardComponent } from './components/quick-card/quick-card.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TableFormComponent } from './components/table-form/table-form.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';

// Pipes
import { ScorePipe } from './pipes/score.pipe';
import { ColumnPipe } from './pipes/column.pipe';

// Directives
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BooleanPipe } from './pipes/boolean.pipe';
import { MapComponent } from './components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ChartsModule,
    NgbModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-outline-danger'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7K_EiA1MSRPKh7Yk4dgkbMAYan4elt5A'
    }),
    MultiselectDropdownModule
  ],
  exports: [
    LoadingModalComponent,
    CardComponent,
    ScorePipe,
    SortIconComponent,
    FormsModule,
    CommonModule,
    QuickCardComponent,
    TaskCardComponent,
    NgbModule,
    ChartsModule,
    TaskFormComponent,
    SweetAlert2Module,
    MultiselectDropdownModule,
    CustomTableComponent,
    ColumnPipe,
    AgmCoreModule,
    ChartCardComponent,
    MapComponent
  ],
  providers: [
    GendersService,
    ParticipantsService,
    ParamMatricesService,
    MatrixTypesService,
    ParamCategoriesService,
    ParamTablesService,
    ParamsService,
    ConnectionService,
    UserService,
    UtilService,
    AuthService,
    DocumentsService,
    CountriesService,
    RelationshipsService,
    TasksService,
    ParamValuesService,
    ParamSubValuesService,
    SanctionsService,
    ScheduleService,
    ComparisonsService,
    NgbActiveModal,
    MapsService,
    AuthGuard
  ],
  declarations: [
    LoadingModalComponent,
    CardComponent,
    ScorePipe,
    SortIconComponent,
    QuickCardComponent,
    TaskCardComponent,
    TaskFormComponent,
    SaveButtonComponent,
    CustomTableComponent,
    PaginatorComponent,
    ColumnPipe,
    BooleanPipe,
    TableFormComponent,
    ChartCardComponent,
    MapComponent
  ]
})
export class SharedModule {}
