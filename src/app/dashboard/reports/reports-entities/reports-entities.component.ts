import { Component, OnInit } from '@angular/core';
import { Participant } from '../../../shared/models/participants.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ParticipantsService } from '../../../shared/services/participants.service';

@Component({
  selector: 'reports-entities',
  templateUrl: './reports-entities.component.html',
  styleUrls: ['./reports-entities.component.css']
})
export class ReportsEntitiesComponent implements OnInit {
  _entities: Participant[];
  _table: TableOptions = {};

  constructor(private _partServ: ParticipantsService) {}

  ngOnInit() {
    this._partServ.getParticipants('entities').subscribe(data => {
      this._entities = data;
    });
    this._table.columns = [
      { name: 'FullName', title: 'Razón Social', type: 'text', filterable: true, sortable: true },
      { name: 'Code', title: 'RUC/NIT', sortable: true },
      { name: 'BirthDate', title: 'Fec. Constitución', type: 'date', sortable: true },
      { name: 'Email', title: 'Email', type: 'text', sortable: true, filterable: true },
      { name: 'Country', title: 'País', type: 'object', objectColumn: 'Country.Name', sortable: true, lookup: true },
      { name: 'Score', title: 'Puntaje', type: 'decimal', sortable: true },
      { name: 'Rate', title: 'Riesgo', type: 'text', sortable: true, lookup: true },
      { name: 'Address', title: 'Dirección', hidden: true },
      { name: 'WebSite', title: 'Sitio Web', hidden: true },
      { name: 'LegalRepresentative', title: 'Representante Legal', hidden: true },
      { name: 'Phone', title: 'Teléfono', hidden: true },
      { name: 'MobilePhone', title: 'Tel. Celular', hidden: true },
      { name: 'CreateDate', title: 'Fec. Creación', hidden: true }
    ];

    this._table.style = 'table table-sm table-squared';

    this._table.reportsOnly = true;

    this._table.pageable = true;

    this._table.exportToCSV = true;
    this._table.exportToPDF = true;

    this._table.searcheable = true;

    this._table.title = 'Entidades';
  }
}
