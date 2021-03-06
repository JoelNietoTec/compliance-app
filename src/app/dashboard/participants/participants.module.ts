import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ParticipantComplianceParamComponent } from './participant-compliance-param/participant-compliance-param.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { IndividualDetailsComponent } from './individual-details/individual-details.component';
import { ParticipantDocumentComponent } from './participant-document/participant-document.component';
import { ParticipantDocumentsComponent } from './participant-documents/participant-documents.component';
import { ParticipantRelationshipsComponent } from './participant-relationships/participant-relationships.component';
import { ParticipantRelationshipComponent } from './participant-relationship/participant-relationship.component';
import { ParticipantRelationshipFormComponent } from './participant-relationship-form/participant-relationship-form.component';
import { ParticipantTasksComponent } from './participant-tasks/participant-tasks.component';
import { ParticipantSanctionsComponent } from './participant-sanctions/participant-sanctions.component';
import { ParticipantProfileComponent } from './participant-profile/participant-profile.component';
import { ParticipantAccountsComponent } from './participant-accounts/participant-accounts.component';
import { ParticipantAccountsFormComponent } from './participant-accounts-form/participant-accounts-form.component';
import { ParticipantTransactionsComponent } from './participant-transactions/participant-transactions.component';
import { ParticipantProfileFormComponent } from './participant-profile-form/participant-profile-form.component';
import { ParticipantTransactionsFormComponent } from './participant-transactions-form/participant-transactions-form.component';
import { ParticipantAlertsComponent } from './participant-alerts/participant-alerts.component';
import { FinancialProfileComponent } from './financial-profile/financial-profile.component';
import { ParticipantProductsComponent } from './participant-products/participant-products.component';
import { ParticipantInfoComponent } from './participant-info/participant-info.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ParticipantsRoutingModule, SharedModule],
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
    ParticipantComplianceParamComponent,
    ParticipantDetailsComponent,
    EntityDetailsComponent,
    IndividualDetailsComponent,
    ParticipantDocumentComponent,
    ParticipantRelationshipsComponent,
    ParticipantRelationshipComponent,
    ParticipantDocumentsComponent,
    ParticipantRelationshipFormComponent,
    ParticipantTasksComponent,
    ParticipantSanctionsComponent,
    ParticipantProfileComponent,
    ParticipantAccountsComponent,
    ParticipantAccountsFormComponent,
    ParticipantTransactionsComponent,
    ParticipantProfileFormComponent,
    ParticipantTransactionsFormComponent,
    ParticipantAlertsComponent,
    FinancialProfileComponent,
    ParticipantProductsComponent,
    ParticipantInfoComponent
  ],
  providers: [
    DecimalPipe
  ],
  entryComponents: [
    ParticipantRelationshipComponent,
    ParticipantAccountsFormComponent,
    ParticipantProfileFormComponent,
    ParticipantTransactionsFormComponent,
    ParticipantAlertsComponent
  ]
})
export class ParticipantsModule {}
