import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';


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
import { AuthGuard } from './services/auth.guard';


// Components
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { CardComponent } from './components/card/card.component';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { QuickCardComponent } from './components/quick-card/quick-card.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

// Pipes
import { ScorePipe } from './pipes/score.pipe';

// Directives
import { SaveButtonComponent } from './components/save-button/save-button.component';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    FormsModule,
    NgbModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-lg btn-primary',
      cancelButtonClass: 'btn btn-lg btn-outline-danger'
    }),
    MultiselectDropdownModule
  ],
  exports: [
    LoadingModalComponent,
    ToastyModule,
    CardComponent,
    ScorePipe,
    SortIconComponent,
    FormsModule,
    CommonModule,
    QuickCardComponent,
    ToastyModule,
    TaskCardComponent,
    NgbModule,
    TaskFormComponent,
    SweetAlert2Module,
    MultiselectDropdownModule
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
    NgbActiveModal,
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
    SaveButtonComponent
  ]
})
export class SharedModule { }
