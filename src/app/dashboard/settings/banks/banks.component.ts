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
        id: 1,
        name: 'Local'
      },
      {
        id: 2,
        name: 'Extranjero'
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
      { name: 'name', title: 'Nombre', sortable: true, filterable: true },
      { name: 'shortName', title: 'Nombre Corto', sortable: true, filterable: true },
      {
        name: 'type',
        title: 'Tipo',
        sortable: true,
        type: 'object',
        list: this._types,
        listID: 'id',
        listDisplay: 'name',
        objectColumn: 'type.name',
        objectID: 'bankTypeId'
      }
    ];
    this._table.pageable = true;

    this._banks = this._bankService.getBanks();
  }

  addBank(bank: Bank) {
    console.log(bank);
    this._bankService.createBank(bank).subscribe(
      data => {
        this.toast.success(data.name, 'Banco creado');
        this._banks = this._bankService.getBanks();
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editBank(bank: Bank) {
    console.log(bank);
    delete bank['texttype'];
    this._bankService.updateBank(bank.id, bank).subscribe(
      data => {
        this.toast.success(bank.name, 'Banco actualizado');
        this._banks = this._bankService.getBanks();
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
