import { Component, OnInit, Input } from '@angular/core';

import { Participant } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.css']
})
export class EntitiesListComponent implements OnInit {
  @Input() entities: Array<Participant>;

  _table: TableOptions = {};

  constructor(private _util: UtilService, private _partServ: ParticipantsService) {}

  ngOnInit() {
    this._table.columns = [
      { name: 'ID', title: '#', type: 'number', sortable: true },
      { name: 'FullName', title: 'Razón Social', type: 'text', filterable: true, sortable: true },
      { name: 'BirthDate', title: 'Fec. Constitución', type: 'date', sortable: true },
      { name: 'Email', title: 'Email', type: 'text', sortable: true, filterable: true },
      { name: 'Score', title: 'Puntaje', type: 'decimal', sortable: true },
      { name: 'Rate', title: 'Riesgo', type: 'text', sortable: true }
    ];

    this._table.style = 'table table-sm table-striped table-squared';

    this._table.pageable = true;

    this._table.searcheable = true;

    this._table.detailsURL = [];

    this._table.newURL = ['new'];

    for (let i of this.entities) {
      i.Rate = this._partServ.getRate(i);
    }
  }
}
