import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule } from '@angular/forms';

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
import { AuthGuard } from './services/auth.guard';

// Components
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { CardComponent } from './components/card/card.component';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';

// Pipes
import { ScorePipe } from './pipes/score.pipe';

// Directives
import { EqualValidator } from './directives/equal-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    FormsModule
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
    ToastyModule
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
    AuthGuard
  ],
  declarations: [
    LoadingModalComponent,
    CardComponent,
    ScorePipe,
    SortIconComponent,
    EqualValidator
  ]
})
export class SharedModule { }
