import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../shared/services/alerts.service';
import { AlertReason, AlertSource, AlertPriority } from '../../../shared/models/alerts.model';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alert-reasons',
  templateUrl: './alert-reasons.component.html',
  styleUrls: ['./alert-reasons.component.css']
})
export class AlertReasonsComponent implements OnInit {
  _sources: Observable<AlertSource[]>;

  _priorities: AlertPriority[] = [
    {
      id: 1,
      name: 'Baja',
      englishName: 'Low'
    },
    {
      id: 2,
      name: 'Media',
      englishName: 'Medium'
    },
    {
      id: 3,
      name: 'Alta',
      englishName: 'High'
    }
  ];
  _table: TableOptions = {};
  _reasons: Observable<AlertReason[]>;

  constructor(private _alertService: AlertsService, private toast: ToastrService) {}

  ngOnInit() {
    this._reasons = this._alertService.getReasons();
    this._sources = this._alertService.getSources();

    this._table.title = 'Generadores de Alertas';
    this._table.style = 'table-sm table-squared';
    this._table.addMethod = 'modal';
    this._table.columns = [
      {
        name: 'source',
        title: 'Fuente',
        sortable: true,
        type: 'object',
        asyncList: this._sources,
        listID: 'id',
        listDisplay: 'name',
        objectColumn: 'source.name',
        objectID: 'alertSourceId'
      },
      { name: 'name', title: 'Nombre' },
      { name: 'englishName', title: 'Nombre Inglés' },
      {
        name: 'priority',
        title: 'Prioridad',
        sortable: true,
        type: 'object',
        list: this._priorities,
        listID: 'id',
        listDisplay: 'name',
        objectColumn: 'priority.name',
        objectID: 'alertPriorityId'
      },
      { name: 'code', title: 'Código' }
    ];
    this._table.pageable = true;
    this._table.editable = true;
  }

  addReason(reason: AlertReason) {
    this._alertService.createReason(reason).subscribe(
      data => {
        this.toast.success(data.name, 'Generador creado');
        this._reasons = this._alertService.getReasons();
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }

  editReason(reason: AlertReason) {
    this._alertService.editReason(reason.id, reason).subscribe(
      data => {
        this.toast.success(reason.name, 'Generador actualizado');
      },
      (err: Error) => {
        this.toast.error(err.message, 'Ocurrió un error');
      }
    );
  }
}
