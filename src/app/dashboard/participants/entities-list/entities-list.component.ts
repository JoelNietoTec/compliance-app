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
  @Input() entities: Participant[];

  _table: TableOptions = {};

  constructor(private _util: UtilService, private _partServ: ParticipantsService) {}

  ngOnInit() {
    this._table.columns = [
      { name: 'fullName', title: 'Razón Social', type: 'text', filterable: true, sortable: true },
      { name: 'code', title: 'RUC/NIT', sortable: true },
      { name: 'birthDate', title: 'Fec. Constitución', type: 'date', sortable: true },
      { name: 'email', title: 'Email', type: 'text', sortable: true, filterable: true },
      { name: 'country', title: 'País', type: 'object', objectColumn: 'country.name', sortable: true, lookup: true },
      { name: 'score', title: 'Puntaje', type: 'decimal', sortable: true, rateField: true, customClasses: 'font-weight-bold' },
      { name: 'rate', title: 'Riesgo', type: 'text', sortable: true, lookup: true, rateField: true, customClasses: 'font-weight-bold' },
      { name: 'address', title: 'Dirección', hidden: true },
      { name: 'webSite', title: 'Sitio Web', hidden: true },
      { name: 'legalRepresentative', title: 'Representante Legal', hidden: true },
      { name: 'phone', title: 'Teléfono', hidden: true },
      { name: 'mobilePhone', title: 'Tel. Celular', hidden: true },
      { name: 'createDate', title: 'Fec. Creación', hidden: true }
    ];

    this._table.style = 'table table-sm table-striped';

    this._table.pageable = true;

    this._table.exportToCSV = true;

    this._table.exportToPDF = true;

    this._table.lookup = true;

    this._table.searcheable = true;

    this._table.detailsURL = [];

    this._table.newURL = ['nuevo'];

    this._table.title = 'Entidades';
  }
}
