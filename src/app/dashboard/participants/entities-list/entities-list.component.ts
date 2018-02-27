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
      { name: 'FullName', title: 'Razón Social', type: 'text', filterable: true, sortable: true },
      { name: 'Code', title: 'RUC/NIT', sortable: true },
      { name: 'BirthDate', title: 'Fec. Constitución', type: 'date', sortable: true },
      { name: 'Email', title: 'Email', type: 'text', sortable: true, filterable: true },
      { name: 'Country', title: 'País', type: 'object', objectColumn: 'Country.Name', sortable: true, lookup: true },
      { name: 'Score', title: 'Puntaje', type: 'decimal', sortable: true, rateField: true, customClasses: 'font-weight-bold' },
      { name: 'Rate', title: 'Riesgo', type: 'text', sortable: true, lookup: true, rateField: true, customClasses: 'font-weight-bold' },
      { name: 'Address', title: 'Dirección', hidden: true },
      { name: 'WebSite', title: 'Sitio Web', hidden: true },
      { name: 'LegalRepresentative', title: 'Representante Legal', hidden: true },
      { name: 'Phone', title: 'Teléfono', hidden: true },
      { name: 'MobilePhone', title: 'Tel. Celular', hidden: true },
      { name: 'CreateDate', title: 'Fec. Creación', hidden: true }
    ];

    this._table.style = 'table table-sm table-squared';

    this._table.pageable = true;

    this._table.exportToCSV = true;

    this._table.lookup = true;

    this._table.searcheable = true;

    this._table.detailsURL = [];

    this._table.newURL = ['nuevo'];

    this._table.title = 'Entidades';

    for (let i of this.entities) {
      i.Rate = this._partServ.getRate(i);
    }
  }
}
