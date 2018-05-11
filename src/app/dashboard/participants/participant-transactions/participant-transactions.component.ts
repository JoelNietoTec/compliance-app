import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ParticipantProfile, Transaction, TransactionSource, TransactionType } from '../../../shared/models/profiles.model';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { ParticipantTransactionsFormComponent } from '../participant-transactions-form/participant-transactions-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { TransactionsService } from '../../../shared/services/transactions.service';
import { UtilService } from '../../../shared/services/util.service';
import { Alert } from '../../../shared/models/alerts.model';

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
    private toast: ToastrService,
    private _util: UtilService
  ) {}

  ngOnInit() {
    this._types = [{ ID: 1, Name: 'Ingreso/Pago' }, { ID: 2, Name: 'Desembolso' }];

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
      { name: 'Description', title: 'Descripción', hidden: true, type: 'text' },
      {
        name: 'ProfileProduct',
        title: 'Producto',
        type: 'object',
        objectColumn: 'ProfileProduct.Name',
        list: this.profile.Products,
        listID: 'ID',
        listDisplay: 'Name',
        objectID: 'ProfileProductID'
      },
      { name: 'Date', title: 'Fecha', type: 'date' },
      { name: 'Amount', title: 'Monto', type: 'money' }
    ];
  }

  getTransactions() {
    this._tranServ.getTransactionsByProfile(this.profile.ID).subscribe(data => {
      this._transactions = this._util.sortBy(data, 'Date', true);
    });
  }

  addTransaction(tran: Transaction) {
    tran.ParticipantProfileID = this.profile.ID;
    tran.ParticipantID = this.profile.ParticipantID;
    this._tranServ.createTransaction(tran).subscribe(
      data => {
        this.validateAlert(data);
        this._transactions.push(data);
        this._newTransaction = {};
        this.toast.success('Transacción registrada');
        this.updateProfile.emit();
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

  validateAlert(tran: Transaction) {
    switch (tran.TransactionTypeID) {
      case 1:
        if (this.profile.IncomeMTD + tran.Amount > this.profile.MonthlyIncomeLimit && this.profile.MonthlyIncomeLimit > 0) {
          const message = `Límite ingresos excedidos - Transaccion ${tran.Title}`;
          this.processAlert(tran, message, 'budget-amount');
        }
        break;
      case 2:
        if (this.profile.ExpenseMTD + tran.Amount > this.profile.MonthlyExpenseLimit && this.profile.MonthlyExpenseLimit > 0) {
          const message = `Límite egresos excedidos - Transaccion ${tran.Title}`;
          this.processAlert(tran, message, 'budget-amount');
        }
        break;
      default:
        break;
    }
  }

  processAlert(tran: Transaction, message: string, reason: string) {
    this._tranServ.generateAlert(this.profile.ParticipantID, reason, message);
  }
}
