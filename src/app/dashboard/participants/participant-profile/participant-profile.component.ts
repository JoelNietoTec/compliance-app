import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { Participant } from '../../../shared/models/participants.model';
import { ParticipantProfile } from '../../../shared/models/profiles.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ParticipantProfileFormComponent } from '../participant-profile-form/participant-profile-form.component';

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

  constructor(private _profileServ: ParticipantProfilesService, public modal: NgbModal, private toast: ToastsManager) {}

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
    this._profileServ.getProfile(this.participant.ID).subscribe(data => {
      this._profile = data;
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
    });
  }
}
