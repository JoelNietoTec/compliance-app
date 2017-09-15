import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

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
import { RelationTypesService } from './services/relationshiptypes.service';
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
import { EqualValidator } from './directives/equal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    FormsModule,
    NgbModule.forRoot(),
    MultiselectDropdownModule
  ],
  exports: [
    LoadingModalComponent,
    ToastyModule,
    CardComponent,
    ScorePipe,
    SortIconComponent,
    EqualValidator,
    FormsModule,
    CommonModule,
    QuickCardComponent,
    ToastyModule,
    TaskCardComponent,
    NgbModule,
    TaskFormComponent,
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
    RelationTypesService,
    TasksService,
    AuthGuard
  ],
  declarations: [
    LoadingModalComponent,
    CardComponent,
    ScorePipe,
    SortIconComponent,
    QuickCardComponent,
    EqualValidator,
    TaskCardComponent,
    TaskFormComponent
  ]
})
export class SharedModule { }
