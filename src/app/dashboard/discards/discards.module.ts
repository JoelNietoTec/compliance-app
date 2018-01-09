import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscardsComponent } from './discards.component';
import { DiscardsRoutingModule } from './discards-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DiscardsListComponent } from './discards-list/discards-list.component';
import { MatchesComponent } from './matches/matches.component';
import { FilesComponent } from './files/files.component';

@NgModule({
  imports: [
    CommonModule,
    DiscardsRoutingModule,
    SharedModule
  ],
  declarations: [DiscardsComponent, DiscardsListComponent, MatchesComponent, FilesComponent]
})
export class DiscardsModule { }
