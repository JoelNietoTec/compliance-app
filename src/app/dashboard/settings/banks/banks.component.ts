import { Component, OnInit } from '@angular/core';
import { BanksService } from '../../../shared/services/banks.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ToastrService } from 'ngx-toastr';
import { Bank, BankType } from '../../../shared/models/profiles.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  _table: TableOptions = {};
  _banks: Observable<Bank[]>;
  _types: BankType[];

  constructor(private _bankService: BanksService, private toast: ToastrService) {}

  ngOnInit() {
    this._types = [
      {
        ID: 1,
        Name: 'Local'
      },
      {
        ID: 2,
        Name: 'Extranjero'
      }
    ];

    this._table.style = 'table table-sm table-squared';
    this._table.editable = true;
    this._table.searcheable = true;
    this._table.exportToCSV = true;
    this._table.creatable = true;
    this._table.addMethod = 'modal';
    this._table.title = 'Bancos';
    this._table.columns = [
      { name: 'Name', title: 'Nombre', sortable: true, filterable: true },
      { name: 'ShortName', title: 'Nombre Corto', sortable: true, filterable: true },
      {
        name: 'BankType',
        title: 'Tipo',
        sortable: true,
        type: 'object',
        list: this._types,
        listID: 'ID',
        listDisplay: 'Name',
        objectColumn: 'BankType.Name',
        objectID: 'BankTypeID'
      }
    ];
    this._table.pageable = true;

    this._banks = this._bankService.getBanks();
  }

  addBank(bank: Bank) {
    this._bankService.createBank(bank).subscribe(
      data => {
        this.toast.success(data.Name, 'Banco creado');
        this._banks = this._bankService.getBanks();
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editBank(bank: Bank) {
    this._bankService.updateBank(bank.ID, bank).subscribe(
      data => {
        this.toast.success(bank.Name, 'Banco actualizado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  deleteBank(id: number) {
    this._bankService.deleteBank(id).subscribe(
      data => {
        this.toast.info('Banco eliminado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
