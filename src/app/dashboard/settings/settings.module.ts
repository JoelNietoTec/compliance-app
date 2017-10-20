import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { RelationshipTypesComponent } from './relationship-types/relationship-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { CountriesComponent } from './countries/countries.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    SettingsRoutingModule
  ],
  declarations: [SettingsComponent, RelationshipTypesComponent, DocumentTypesComponent, CountriesComponent]
})
export class SettingsModule { }
