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
      { name: 'FullName', title: 'Nombre', type: 'text', filterable: true, sortable: true },
      { name: 'BirthDate', title: 'Fec. Nac', type: 'date', sortable: true },
      { name: 'Email', title: 'Email', type: 'text', sortable: true, filterable: true },
      { name: 'Score', title: 'Puntaje', type: 'decimal', sortable: true },
      { name: 'Rate', title: 'Riesgo', type: 'text', sortable: true },
      { name: 'Country', title: 'País', type: 'object', objectColumn: 'Country.Name', sortable: true }
    ];

    this._table.style = 'table table-sm table-striped table-squared';

    this._table.pageable = true;

    this._table.searcheable = true;

    this._table.items = this.individuals;

    this._table.detailsURL = [];

    this._table.newURL = ['new'];

    for (let i of this.individuals) {
      i.Rate = this._partServ.getRate(i);
    }
  }
}
