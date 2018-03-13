import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { Participant } from '../../../shared/models/participants.model';
import { ParticipantProfile } from '../../../shared/models/profiles.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ParticipantProfileFormComponent } from '../participant-profile-form/participant-profile-form.component';
import { ParticipantAlertsService } from '../../../shared/services/participant-alerts.service';
import { ParticipantAlert } from '../../../shared/models/alerts.model';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})
export class ParticipantProfileComponent implements OnInit {
  @Input() participant: Participant;
  @ViewChild(ParticipantProfileFormComponent) form: ParticipantProfileFormComponent;

  _profile: ParticipantProfile;
  _updatedProfile: ParticipantProfile;

  constructor(
    private _profileServ: ParticipantProfilesService,
    private _alertServ: ParticipantAlertsService,
    public modal: NgbModal,
    private toast: ToastsManager
  ) {}

  ngOnInit() {
    console.log(new Date().toLocaleString());
    this.getProfile();
  }

  open() {
    const modalRef = this.modal.open(ParticipantProfileFormComponent);
    modalRef.result.then(
      result => {
        this.updateProfile();
      },
      dismiss => {}
    );
    this._updatedProfile = Object.assign({}, this._updatedProfile, this._profile);

    modalRef.componentInstance.currentProfile = this._updatedProfile;
  }

  getProfile() {
    let profile: ParticipantProfile;
    if (this._profile) {
      profile = Object.assign({}, profile, this._profile);
    }
    this._profileServ.getProfile(this.participant.ID).subscribe(data => {
      this._profile = data;
      if (profile) {
        if (
          this._profile.ExpenseMTD > this._profile.MonthlyExpenseLimit &&
          this._profile.MonthlyExpenseLimit > 0 &&
          profile.ExpenseMTD < this._profile.ExpenseMTD
        ) {
          let alert: ParticipantAlert = {};
          alert.Date = new Date();
          alert.ParticipantID = this._profile.ParticipantID;
          alert.AlertTypeID = 2;
          alert.Name = 'Sobrepaso egresos';
          alert.Description = 'Sobrepasó límite de egresos mensuales';
          this._alertServ.createAlert(alert).subscribe(datad => {});
        }
        if (
          this._profile.IncomeMTD > this._profile.MonthlyIncomeLimit &&
          this._profile.MonthlyIncomeLimit > 0 &&
          profile.IncomeMTD < this._profile.IncomeMTD
        ) {
          let alert: ParticipantAlert = {};
          alert.Date = new Date();
          alert.ParticipantID = this._profile.ParticipantID;
          alert.AlertTypeID = 2;
          alert.Name = 'Sobrepaso ingresos';
          alert.Description = 'Sobrepasó límite de ingresos mensuales';
          this._alertServ.createAlert(alert).subscribe(datad => {});
        }
      }
    });
  }

  updateProfile() {
    let profile: ParticipantProfile;
    profile = Object.assign({}, profile, this._updatedProfile);
    console.log(profile);
    profile.Accounts = [];
    this._profileServ.updateProfile(profile.ID, profile).subscribe(data => {
      this.toast.success('Perfil actualizado');
      profile.Accounts = this._profile.Accounts;
      this._profile = profile;
      if (
        (this._profile.ExpenseMTD > this._profile.MonthlyExpenseLimit && this._profile.MonthlyExpenseLimit > 0) ||
        (this._profile.IncomeMTD > this._profile.MonthlyIncomeLimit && this._profile.MonthlyIncomeLimit > 0)
      ) {
        this.toast.error('Limite mensual excedido, favor revisar!');
      }
    });
  }
}
