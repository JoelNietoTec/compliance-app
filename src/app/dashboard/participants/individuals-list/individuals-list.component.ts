import { Component, OnInit, Input } from '@angular/core';

import { Participant } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { TableOptions, Column } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'individuals-list',
  templateUrl: './individuals-list.component.html',
  styleUrls: ['./individuals-list.component.css']
})
export class IndividualsListComponent implements OnInit {
  @Input() individuals: Array<Participant>;

  _table: TableOptions = {};
  _columns: Array<Column>;

  constructor(private _partServ: ParticipantsService) {}

  ngOnInit() {
    this._table.columns = [
      { name: 'fullName', title: 'Nombre', type: 'text', filterable: true, sortable: true },
      { name: 'code', title: '# Doc', filterable: true },
      { name: 'birthDate', title: 'Fec. Nac', type: 'date', sortable: true },
      { name: 'email', title: 'Email', type: 'text', sortable: true, filterable: true },
      { name: 'country', title: 'País', type: 'object', objectColumn: 'country.name', sortable: true, lookup: true },
      { name: 'score', title: 'Puntaje', type: 'decimal', sortable: true, rateField: true, customClasses: 'font-weight-bold' },
      { name: 'rate', title: 'Riesgo', type: 'text', sortable: true, lookup: true, rateField: true, customClasses: 'font-weight-bold' },
      { name: 'address', title: 'Dirección', hidden: true },
      { name: 'gender', title: 'Género', type: 'object', objectColumn: 'gender.name', hidden: true },
      { name: 'phone', title: 'Teléfono', hidden: true },
      { name: 'mobilePhone', title: 'Tel. Celular', hidden: true },
      { name: 'createDate', title: 'Fec. Creación', hidden: true }
    ];

    this._table.style = 'table table-sm table-squared';

    this._table.pageable = true;

    this._table.lookup = true;

    this._table.searcheable = true;
    this._table.exportToCSV = true;
    this._table.exportToPDF = true;

    this._table.detailsURL = [];

    this._table.newURL = ['nuevo'];
    this._table.title = 'Individuos';

    for (let i of this.individuals) {
      i.rate = this._partServ.getRate(i);
    }
  }
}
