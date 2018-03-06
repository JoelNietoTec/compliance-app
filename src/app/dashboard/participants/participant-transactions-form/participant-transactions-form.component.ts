import { Component, OnInit, Input } from '@angular/core';
import { ParticipantProfile, ProfileAccount, AccountType, Transaction } from '../../../shared/models/profiles.model';
import { NgbActiveModal, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'app-participant-transactions-form',
  templateUrl: './participant-transactions-form.component.html',
  styleUrls: ['./participant-transactions-form.component.css']
})
export class ParticipantTransactionsFormComponent implements OnInit {
  @Input() profile: ParticipantProfile;
  @Input() currentTransaction: Transaction;

  _accounts: ProfileAccount[];
  _types: AccountType[];
  _date: NgbDateStruct;

  constructor(public activeModal: NgbActiveModal, private _util: UtilService, private _dateFormatter: NgbDateParserFormatter) {}

  ngOnInit() {
    this._accounts = this.profile.Accounts;
    this._types = [
      {
        ID: 1,
        Name: 'Ingreso'
      },
      {
        ID: 2,
        Name: 'Egreso'
      }
    ];
  }

  updateDate() {
    this.currentTransaction.Date = new Date(this._dateFormatter.format(this._date));
  }
}
