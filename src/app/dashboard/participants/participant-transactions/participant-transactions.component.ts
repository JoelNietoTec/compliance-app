import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ParticipantProfile, Transaction } from '../../../shared/models/profiles.model';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { ParticipantTransactionsFormComponent } from '../participant-transactions-form/participant-transactions-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'participant-transactions',
  templateUrl: './participant-transactions.component.html',
  styleUrls: ['./participant-transactions.component.css']
})
export class ParticipantTransactionsComponent implements OnInit {
  @Input() profile: ParticipantProfile;
  @ViewChild(ParticipantTransactionsFormComponent) form: ParticipantTransactionsFormComponent;
  @Output() updateProfile = new EventEmitter();

  _transactions: Transaction[];
  _newTransaction: Transaction = {};

  constructor(private _profileServ: ParticipantProfilesService, private modal: NgbModal, private toast: ToastsManager) {}

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this._profileServ.getTransactionsByProfile(this.profile.ID).subscribe(data => {
      this._transactions = data;
    });
  }

  open() {
    const modalRef = this.modal.open(ParticipantTransactionsFormComponent);
    modalRef.result.then(
      result => {
        this.addTransaction();
      },
      dissmiss => {
        this._newTransaction = {};
      }
    );
    modalRef.componentInstance.currentTransaction = this._newTransaction;
    modalRef.componentInstance.profile = this.profile;
  }

  addTransaction() {
    this._newTransaction.ParticipantProfileID = this.profile.ID;
    this._profileServ.createTransaction(this._newTransaction).subscribe(data => {
      this._newTransaction = {};
      this.toast.success('Transacción registrada');
      this.updateProfile.emit();
      this.getTransactions();

    });
  }
}
