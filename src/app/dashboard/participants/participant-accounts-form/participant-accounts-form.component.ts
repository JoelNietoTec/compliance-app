import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileAccount, AccountType, Bank } from '../../../shared/models/profiles.model';
import { UtilService } from '../../../shared/services/util.service';
import { BanksService } from '../../../shared/services/banks.service';

@Component({
  selector: 'participant-accounts-form',
  templateUrl: './participant-accounts-form.component.html',
  styleUrls: ['./participant-accounts-form.component.css']
})
export class ParticipantAccountsFormComponent implements OnInit {
  @Input() currentAccount: ProfileAccount;

  _types: AccountType[];
  _banks: Bank[];

  constructor(public activeModal: NgbActiveModal, private _bankServ: BanksService, private _util: UtilService) {}

  ngOnInit() {
    this._types = [
      {
        ID: 1,
        Name: 'Activo'
      },
      {
        ID: 2,
        Name: 'Pasivos'
      }
    ];

    this._bankServ.getBanks().subscribe(data => {
      this._banks = this._util.sortBy(data, 'Name');
    });
  }
}
