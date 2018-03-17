import { Component, OnInit } from '@angular/core';
import { ParticipantAlertsService } from '../../../shared/services/participant-alerts.service';
import { ParticipantAlert } from '../../../shared/models/alerts.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'app-reports-alerts',
  templateUrl: './reports-alerts.component.html',
  styleUrls: ['./reports-alerts.component.css']
})
export class ReportsAlertsComponent implements OnInit {
  _alerts: ParticipantAlert[];
  _table: TableOptions = {};

  constructor(private _alertServ: ParticipantAlertsService) {}

  ngOnInit() {
    this._alertServ.getAlerts().subscribe(data => {
      this._alerts = data;
    });

    this._table.title = 'Alertas';
    this._table.style = 'squared table-sm table-striped';
    this._table.exportToCSV = true;
    this._table.searcheable = true;
    this._table.showTitle = true;
    this._table.lookup = true;
    this._table.pageable = true;
    this._table.reportsOnly = true;

    this._table.columns = [
      { name: 'Participant', title: 'Participante', type: 'object', objectColumn: 'Participant.ShortName', filterable: true },
      { name: 'AlertType', title: 'Tipo', type: 'object', objectColumn: 'AlertType.Name', sortable: true, lookup: true },
      { name: 'Name', title: 'Nombre' },
      { name: 'Description', title: 'Descripción' },
      { name: 'Date', title: 'Fecha', type: 'datetime' },
      { name: 'Discard', title: 'Descartado', type: 'boolean' }
    ];
  }
}
