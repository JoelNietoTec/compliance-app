import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AgmCoreModule } from '@agm/core';
import { BreadcrumbsModule } from 'ng2-breadcrumbs';
import { ChartjsModule } from '@ctrl/ngx-chartjs';

// Components
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { CardComponent } from './components/card/card.component';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { QuickCardComponent } from './components/quick-card/quick-card.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TableFormComponent } from './components/table-form/table-form.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { WaitingModalComponent } from './components/waiting-modal/waiting-modal.component';
import { AssignmentCardComponent } from './components/assignment-card/assignment-card.component';
import { AssignmentFormComponent } from './components/assignment-form/assignment-form.component';
import { SegmentChartComponent } from './components/segment-chart/segment-chart.component';

// Pipes
import { ScorePipe } from './pipes/score.pipe';
import { ColumnPipe } from './pipes/column.pipe';

// Directives
import { SaveButtonComponent } from './components/save-button/save-button.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { BooleanPipe } from './pipes/boolean.pipe';
import { MapComponent } from './components/map/map.component';
import { DateInputComponent } from './components/date-input/date-input.component';

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
import { RoadmapService } from './services/roadmap.service';
import { ParticipantProfilesService } from './services/participant-profiles.service';
import { FilesService } from './services/files.service';
import { BanksService } from './services/banks.service';
import { ParticipantAlertsService } from './services/participant-alerts.service';
import { SanctionListsService } from './services/sanction-lists.service';
import { TransactionsService } from './services/transactions.service';
import { ProfileAccountsService } from './services/profile-accounts.service';
import { FinancialProductsService } from './services/financial-products.service';
import { AlertsService } from './services/alerts.service';
import { AssignmentsService } from './services/assignments.service';
import { ProjectsService } from './services/projects.service';
import { SegmentListComponent } from './components/segment-list/segment-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ChartsModule,
    ChartjsModule,
    NgbModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-outline-danger'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB7K_EiA1MSRPKh7Yk4dgkbMAYan4elt5A'
    })
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
    CustomTableComponent,
    ColumnPipe,
    AgmCoreModule,
    ChartCardComponent,
    DateInputComponent,
    MapComponent,
    WaitingModalComponent,
    AssignmentCardComponent,
    AssignmentFormComponent,
    SegmentChartComponent
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
    ComparisonsService,
    RoadmapService,
    NgbActiveModal,
    MapsService,
    ParticipantProfilesService,
    FilesService,
    BanksService,
    ParticipantAlertsService,
    SanctionListsService,
    TransactionsService,
    ProfileAccountsService,
    FinancialProductsService,
    AlertsService,
    AuthGuard,
    DatePipe,
    AssignmentsService,
    ProjectsService
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
    MapComponent,
    DateInputComponent,
    WaitingModalComponent,
    AssignmentCardComponent,
    AssignmentFormComponent,
    SegmentChartComponent,
    SegmentListComponent
  ],
  entryComponents: [TableFormComponent, AssignmentFormComponent]
})
export class SharedModule {}
