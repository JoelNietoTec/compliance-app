import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts.component';
import { AlertsRoutingModule } from './alerts-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertSourcesComponent } from './alert-sources/alert-sources.component';
import { AlertReasonsComponent } from './alert-reasons/alert-reasons.component';

@NgModule({
  imports: [CommonModule, SharedModule, NgbModalModule, AlertsRoutingModule],
  declarations: [AlertsComponent, AlertSourcesComponent, AlertReasonsComponent]
})
export class AlertsModule {}
