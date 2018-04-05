import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ParticipantProfile, Transaction, TransactionSource, TransactionType } from '../../../shared/models/profiles.model';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { ParticipantTransactionsFormComponent } from '../participant-transactions-form/participant-transactions-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { TransactionsService } from '../../../shared/services/transactions.service';

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
  _table: TableOptions = {};
  _sources: TransactionSource[];
  _types: TransactionType[];

  constructor(
    private _profileServ: ParticipantProfilesService,
    private _tranServ: TransactionsService,
    private modal: NgbModal,
    private toast: ToastsManager
  ) {}

  ngOnInit() {
    this._types = [{ ID: 1, Name: 'Ingreso' }, { ID: 2, Name: 'Egreso' }];

    this._tranServ.getSources().subscribe(data => {
      this._sources = data;
      this.initTable();
    });
    this.getTransactions();
  }

  initTable() {
    this._table.title = 'Transacciones';
    this._table.pageable = true;
    this._table.reportsOnly = true;
    this._table.addMethod = 'modal';
    this._table.style = 'table-sm table-striped table-squared';
    this._table.columns = [
      {
        name: 'TransactionType',
        title: 'Tipo',
        type: 'object',
        objectColumn: 'TransactionType.Name',
        list: this._types,
        listID: 'ID',
        listDisplay: 'Name',
        objectID: 'TransactionTypeID'
      },
      {
        name: 'TransactionSource',
        title: 'Fuente',
        type: 'object',
        objectColumn: 'TransactionSource.Name',
        list: this._sources,
        listID: 'ID',
        listDisplay: 'Name',
        objectID: 'TransactionSourceID'
      },
      { name: 'Title', title: 'Nombre' },
      { name: 'Description', title: 'Descripción' },
      {
        name: 'Account',
        title: 'Cuenta',
        type: 'object',
        objectColumn: 'Account.Name',
        list: this.profile.Accounts,
        listID: 'ID',
        listDisplay: 'Name',
        objectID: 'AccountID'
      },
      { name: 'Date', title: 'Fecha', type: 'date' },
      { name: 'Amount', title: 'Monto', type: 'money' }
    ];
  }

  getTransactions() {
    this._tranServ.getTransactionsByProfile(this.profile.ID).subscribe(data => {
      this._transactions = data;
    });
  }

  open() {
    // const modalRef = this.modal.open(ParticipantTransactionsFormComponent, { size: 'lg' });
    // modalRef.result.then(
    //   result => {
    //     this.addTransaction();
    //   },
    //   dissmiss => {
    //     this._newTransaction = {};
    //   }
    // );
    // modalRef.componentInstance.currentTransaction = this._newTransaction;
    // modalRef.componentInstance.profile = this.profile;
  }

  addTransaction(tran: Transaction) {
    tran.ParticipantProfileID = this.profile.ID;
    tran.ParticipantID = this.profile.ParticipantID;
    this._tranServ.createTransaction(tran).subscribe(
      data => {
        console.log(data);
        this._transactions.push(data);
        this._newTransaction = {};
        this.toast.success('Transacción registrada');
        this.updateProfile.emit();
        // this.getTransactions();
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editTransaction(tran: Transaction) {
    this._tranServ.updateTransaction(tran.ID, tran).subscribe(
      data => {
        this.toast.success('Transacción actualizada');
        this.updateProfile.emit();
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
