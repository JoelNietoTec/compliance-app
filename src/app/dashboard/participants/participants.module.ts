import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { ParticipantsRoutingModule } from './participants-routing.module';
import { ParticipantsComponent } from './participants.component';
import { IndividualFormComponent } from './individual-form/individual-form.component';
import { EntityFormComponent } from './entity-form/entity-form.component';
import { ParticipantFormComponent } from './participant-form/participant-form.component';
import { IndividualsListComponent } from './individuals-list/individuals-list.component';
import { EntitiesListComponent } from './entities-list/entities-list.component';
import { ParticipantsListComponent } from './participants-list/participants-list.component';
import { ParticipantComplianceComponent } from './participant-compliance/participant-compliance.component';
import { ParticipantComplianceDetailsComponent } from './participant-compliance-details/participant-compliance-details.component';
import { ParticipantComplianceParamComponent } from './participant-compliance-param/participant-compliance-param.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { IndividualDetailsComponent } from './individual-details/individual-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ParticipantsRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    ParticipantsComponent,
    IndividualFormComponent,
    EntityFormComponent,
    ParticipantFormComponent,
    IndividualsListComponent,
    EntitiesListComponent,
    ParticipantsListComponent,
    ParticipantComplianceComponent,
    ParticipantComplianceDetailsComponent,
    ParticipantComplianceParamComponent,
    ParticipantDetailsComponent,
    EntityDetailsComponent,
    IndividualDetailsComponent
  ]
})
export class ParticipantsModule { }
