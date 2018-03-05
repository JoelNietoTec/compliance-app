import { Component, OnInit } from '@angular/core';
import { BanksService } from '../../../shared/services/banks.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ToastsManager } from 'ng2-toastr';
import { Bank, BankType } from '../../../shared/models/profiles.model';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  _table: TableOptions = {};
  _banks: Bank[];
  _types: BankType[];

  constructor(private _bankService: BanksService, private toast: ToastsManager) {}

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
    this._table.addMethod = 'inline';
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

    this._bankService.getBanks().subscribe(data => {
      this._banks = data;
    });
  }

  addBank(bank: Bank) {
    console.log(bank);
    this._bankService.createBank(bank).subscribe(data => {
      this.toast.success(data.Name, 'Banco creado');
      console.log(data);
      this._banks.push(data);
    });
  }
}
