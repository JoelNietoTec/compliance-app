import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../shared/services/alerts.service';
import { AlertSource } from '../../../shared/models/alerts.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alert-sources',
  templateUrl: './alert-sources.component.html',
  styleUrls: ['./alert-sources.component.css']
})
export class AlertSourcesComponent implements OnInit {
  _sources: Observable<AlertSource[]>;
  _table: TableOptions = {};

  constructor(private _alertServ: AlertsService) {}

  ngOnInit() {
    this._sources =  this._alertServ.getSources();
    this._table.title = 'Fuentes de alertas';
    this._table.style = 'table-sm table-squared';
    this._table.pageable = true;
    this._table.columns = [{ name: 'name', title: 'Nombre' }, { name: 'englishName', title: 'Nombre Inglés' }];
  }
}
