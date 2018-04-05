import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../shared/services/transactions.service';
import { Transaction } from '../../../shared/models/profiles.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'app-reports-transactions',
  templateUrl: './reports-transactions.component.html',
  styleUrls: ['./reports-transactions.component.css']
})
export class ReportsTransactionsComponent implements OnInit {
  _transactions: Transaction[];
  _table: TableOptions = {};
  constructor(private _tranServ: TransactionsService) {}

  ngOnInit() {
    this._tranServ.getTransactions().subscribe(data => {
      this._transactions = data;
    });
    this._table.title = 'Transacciones';
    this._table.style = 'squared table-sm table-striped';
    this._table.exportToCSV = true;
    this._table.exportToPDF = true;
    this._table.searcheable = true;
    this._table.showTitle = true;
    this._table.lookup = true;
    this._table.pageable = true;
    this._table.reportsOnly = true;
    this._table.columns = [
      { name: 'Participant', title: 'Participante', type: 'object', objectColumn: 'Participant.ShortName', filterable: true, lookup: true },
      { name: 'TransactionType', title: 'Tipo', type: 'object', objectColumn: 'TransactionType.Name', sortable: true, lookup: true },
      { name: 'TransactionSource', title: 'Fuente', type: 'object', objectColumn: 'TransactionSource.Name', sortable: true, lookup: true },
      { name: 'Account', title: 'Cuenta', type: 'object', objectColumn: 'Account.Name', sortable: true, lookup: true },
      { name: 'Title', title: 'Nombre' },
      { name: 'Description', title: 'Descripción' },
      { name: 'Date', title: 'Fecha', type: 'date' },
      { name: 'Amount', title: 'Monto', type: 'money' }
    ];
  }
}
