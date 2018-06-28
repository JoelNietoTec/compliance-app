import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { Participant } from '../../../shared/models/participants.model';
import { ParticipantProfile } from '../../../shared/models/profiles.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
    private toast: ToastrService
  ) {}

  ngOnInit() {
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
    this._profileServ.getProfile(this.participant.id).subscribe(data => {
      this._profile = data;
      if (profile) {
        if (
          this._profile.expenseMTD > this._profile.monthlyExpenseLimit &&
          this._profile.monthlyExpenseLimit > 0 &&
          profile.expenseMTD < this._profile.expenseMTD
        ) {
          const alert: ParticipantAlert = {};
          alert.Date = new Date();
          alert.ParticipantID = this._profile.participantId;
          alert.AlertTypeID = 2;
          alert.Name = 'Sobrepaso egresos';
          alert.Description = 'Sobrepasó límite de egresos mensuales';
          this._alertServ.createAlert(alert).subscribe(datad => {
            this._alertServ.updateLastAlerts();
            this.toast.error(alert.Description);
          });
        }
        if (
          this._profile.incomeMTD > this._profile.monthlyIncomeLimit &&
          this._profile.monthlyIncomeLimit > 0 &&
          profile.incomeMTD < this._profile.incomeMTD
        ) {
          const alert: ParticipantAlert = {};
          alert.Date = new Date();
          alert.ParticipantID = this._profile.participantId;
          alert.AlertTypeID = 2;
          alert.Name = 'Sobrepaso ingresos';
          alert.Description = 'Sobrepasó límite de ingresos mensuales';
          this._alertServ.createAlert(alert).subscribe(datad => {
            this.toast.error(alert.Description);
          });
        }
      }
    });
  }

  updateProfile() {
    let profile: ParticipantProfile;
    profile = Object.assign({}, profile, this._updatedProfile);
    console.log(profile);
    profile.Accounts = [];
    this._profileServ.updateProfile(profile.id, profile).subscribe(data => {
      this.toast.success('Perfil actualizado');
      profile.Accounts = this._profile.Accounts;
      this._profile = profile;
    });
  }
}
