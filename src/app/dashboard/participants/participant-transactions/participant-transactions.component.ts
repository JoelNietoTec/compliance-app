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
import { Observable } from 'rxjs/Observable';
import { ProfileProduct } from '../../../shared/models/products.model';
import { FinancialProductsService } from '../../../shared/services/financial-products.service';

@Component({
  selector: 'participant-transactions',
  templateUrl: './participant-transactions.component.html',
  styleUrls: ['./participant-transactions.component.css']
})
export class ParticipantTransactionsComponent implements OnInit {
  @Input() profile: ParticipantProfile;
  @ViewChild(ParticipantTransactionsFormComponent) form: ParticipantTransactionsFormComponent;
  @Output() updateProfile = new EventEmitter();

  _transactions: Observable<Transaction[]>;
  _newTransaction: Transaction = {};
  _table: TableOptions = {};
  _sources = this._tranServ.getSources();
  _types: TransactionType[];
  _products: Observable<ProfileProduct[]>;

  constructor(
    private _tranServ: TransactionsService,
    private _prodServ: FinancialProductsService,
    private toast: ToastrService,
  ) {}

  ngOnInit() {
    this._transactions = this._tranServ.getTransactionsByProfile(this.profile.id);
    this._products = this._prodServ.getProfileProducts(this.profile.id);

    this._types = [{ id: 1, name: 'Ingreso/Pago' }, { id: 2, name: 'Desembolso' }];
      this.initTable();
  }

  initTable() {
    this._table.title = 'Transacciones';
    this._table.pageable = true;
    this._table.reportsOnly = true;
    this._table.addMethod = 'modal';
    this._table.style = 'table-sm table-striped table-squared';
    this._table.columns = [
      {
        name: 'type',
        title: 'Tipo',
        type: 'object',
        objectColumn: 'type.name',
        list: this._types,
        listID: 'id',
        listDisplay: 'name',
        objectID: 'transactionTypeId'
      },
      {
        name: 'source',
        title: 'Fuente',
        type: 'object',
        objectColumn: 'source.name',
        asyncList: this._sources,
        listID: 'id',
        listDisplay: 'name',
        objectID: 'transactionSourceId'
      },
      { name: 'title', title: 'Nombre' },
      { name: 'description', title: 'Descripción', hidden: true, type: 'text' },
      {
        name: 'product',
        title: 'Producto',
        type: 'object',
        objectColumn: 'product.name',
        asyncList: this._products,
        listID: 'id',
        listDisplay: 'name',
        objectID: 'profileProductId'
      },
      { name: 'date', title: 'Fecha', type: 'date' },
      { name: 'amount', title: 'Monto', type: 'money' }
    ];
    this._table.sortColumn = 'Date';
    this._table.sortDesc = true;
  }

  addTransaction(tran: Transaction) {
    tran.participantProfileId = this.profile.id;
    tran.participantId = this.profile.participantId;
    this._tranServ.createTransaction(tran).subscribe(
      data => {
        this.validateAlert(data);
        this._transactions = this._tranServ.getTransactionsByProfile(this.profile.id);
        this.toast.success('Transacción registrada');
        this.updateProfile.emit();
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editTransaction(tran: Transaction) {
    this._tranServ.updateTransaction(tran.id, tran).subscribe(
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
    switch (tran.transactionTypeId) {
      case 1:
        if (this.profile.incomeMTD + tran.amount > this.profile.monthlyIncomeLimit && this.profile.monthlyIncomeLimit > 0) {
          const message = `Límite ingresos excedidos - Transaccion ${tran.title}`;
          this.processAlert(tran, message, 'budget-amount');
        }
        break;
      case 2:
        if (this.profile.expenseMTD + tran.amount > this.profile.monthlyExpenseLimit && this.profile.monthlyExpenseLimit > 0) {
          const message = `Límite egresos excedidos - Transaccion ${tran.title}`;
          this.processAlert(tran, message, 'budget-amount');
        }
        break;
      default:
        break;
    }
  }

  processAlert(tran: Transaction, message: string, reason: string) {
    this._tranServ.generateAlert(this.profile.participantId, reason, message);
  }
}
