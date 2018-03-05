import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ParticipantProfile, ProfileAccount } from '../../../shared/models/profiles.model';
import { ParticipantAccountsFormComponent } from '../participant-accounts-form/participant-accounts-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';

@Component({
  selector: 'participant-accounts',
  templateUrl: './participant-accounts.component.html',
  styleUrls: ['./participant-accounts.component.css']
})
export class ParticipantAccountsComponent implements OnInit {
  @Input() profile: ParticipantProfile;
  @ViewChild(ParticipantAccountsFormComponent) form: ParticipantAccountsFormComponent;

  _currentAccount: ProfileAccount = {};

  constructor(private modal: NgbModal, private _profilesService: ParticipantProfilesService, private toast: ToastsManager) {}

  ngOnInit() {}

  open() {
    const modalRef = this.modal.open(ParticipantAccountsFormComponent);
    modalRef.result.then(
      result => {
        this.saveAccount();
      },
      dismiss => {
        this._currentAccount = {};
      }
    );
    modalRef.componentInstance.currentAccount = this._currentAccount;
  }

  saveAccount() {
    if (!this._currentAccount.ID) {
      this.createAccount();
      this._currentAccount = {};
    }
  }

  createAccount() {
    this._currentAccount.ParticipantProfileID = this.profile.ID;
    this._profilesService.createAccount(this._currentAccount).subscribe(data => {
      this.toast.success('Cuenta agregada exitosamente');
      this.profile.Accounts.push(data);
    });
  }
}
