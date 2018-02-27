import { Component, OnInit } from '@angular/core';
import { Participant } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'reports-individuals',
  templateUrl: './reports-individuals.component.html',
  styleUrls: ['./reports-individuals.component.css']
})
export class ReportsIndividualsComponent implements OnInit {
  _individuals: Participant[];
  _table: TableOptions = {};

  constructor(private _partServ: ParticipantsService) {}

  ngOnInit() {
    this._partServ.getParticipants('individuals').subscribe(data => {
      this._individuals = data;
    });

    this._table.columns = [
      { name: 'FullName', title: 'Nombre', type: 'text', filterable: true, sortable: true },
      { name: 'Code', title: '# Doc', filterable: true },
      { name: 'BirthDate', title: 'Fec. Nac', type: 'date', sortable: true },
      { name: 'Email', title: 'Email', type: 'text', sortable: true, filterable: true },
      { name: 'Country', title: 'País', type: 'object', objectColumn: 'Country.Name', sortable: true, lookup: true },
      { name: 'Score', title: 'Puntaje', type: 'decimal', sortable: true },
      { name: 'Rate', title: 'Riesgo', type: 'text', sortable: true, lookup: true },
      { name: 'Address', title: 'Dirección', hidden: true },
      { name: 'Gender', title: 'Género', type: 'object', objectColumn: 'Gender.Name', hidden: true },
      { name: 'Phone', title: 'Teléfono', hidden: true },
      { name: 'MobilePhone', title: 'Tel. Celular', hidden: true },
      { name: 'CreateDate', title: 'Fec. Creación', hidden: true }
    ];

    this._table.style = 'table table-sm table-squared';

    this._table.pageable = true;

    this._table.searcheable = true;
    this._table.exportToCSV = true;
    this._table.reportsOnly = true;
    this._table.title = 'Individuos';
  }
}
