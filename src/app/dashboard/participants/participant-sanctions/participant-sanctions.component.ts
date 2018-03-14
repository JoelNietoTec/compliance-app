import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Match } from '../../../shared/models/sanctions.model';
import { ComparisonsService } from '../../../shared/services/comparisons.service';
import { UtilService } from '../../../shared/services/util.service';
import { ParticipantAlert } from '../../../shared/models/alerts.model';
import { ParticipantAlertsService } from '../../../shared/services/participant-alerts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ParticipantAlertsComponent } from '../participant-alerts/participant-alerts.component';

@Component({
  selector: 'participant-sanctions',
  templateUrl: './participant-sanctions.component.html',
  styleUrls: ['./participant-sanctions.component.css']
})
export class ParticipantSanctionsComponent implements OnInit {
  @Input() participantID: number;
  @ViewChild(ParticipantAlertsComponent) form: ParticipantAlertsComponent;

  _matches: Match[];
  _alerts: ParticipantAlert[];
  _currentAlert: ParticipantAlert;
  _showDiscarded: Boolean;

  constructor(
    private _util: UtilService,
    private _compServ: ComparisonsService,
    private _alertService: ParticipantAlertsService,
    private modal: NgbModal,
    private toast: ToastsManager
  ) {}

  ngOnInit() {
    this._alertService.getAlertsByParticipant(this.participantID).subscribe(data => {
      this._alerts = this._util.sortBy(data, 'Date', true);
    });
    this._compServ.getMatchesByParticipant(this.participantID).subscribe(data => {
      this._matches = data;
    });
  }

  open() {
    const modalRef = this.modal.open(ParticipantAlertsComponent);
    modalRef.result.then(
      result => {
        this.updateAlert();
      },
      dismiss => {}
    );
    modalRef.componentInstance.currentAlert = this._currentAlert;
  }

  toogleShow() {
    this._showDiscarded = !this._showDiscarded;
  }

  selectAlert(alert: ParticipantAlert) {
    console.log(alert);
    this._currentAlert = alert;
    this.open();
  }

  updateAlert() {
    this._currentAlert.Discard = true;
    this._alertService.updateAlert(this._currentAlert.ID, this._currentAlert).subscribe(data => {
      this.toast.success('Alerta aclarada');
    });
  }
}
