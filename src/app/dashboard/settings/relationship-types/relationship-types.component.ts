import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { RelationshipType } from '../../../shared/models/relationships.model';
import { RelationshipsService } from '../../../shared/services/relationships.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'app-relationship-types',
  templateUrl: './relationship-types.component.html',
  styleUrls: ['./relationship-types.component.css']
})
export class RelationshipTypesComponent implements OnInit {
  _types = this._relService.getTypes();
  _newType: RelationshipType = {};
  _currentType: RelationshipType = {};
  _table: TableOptions = {};

  constructor(public _relService: RelationshipsService, private toastr: ToastrService) {}

  ngOnInit() {
    this._table.columns = [
      { name: 'name', title: 'Nombre', type: 'text', sortable: true },
      { name: 'englishName', title: 'Nombre Inglés', sortable: true }
    ];

    this._table.editable = true;

    this._table.style = 'table-sm table-squared';
    this._table.addMethod = 'inline';
    this._table.exportToCSV = true;
    this._table.pageable = true;
    this._table.exportToPDF = true;

  }

  addType(type: RelationshipType) {
    this._relService.createType(type).subscribe(data => {
      this.toastr.success(data.name, 'Tipo creado');
      this._types = this._relService.getTypes();
      this._newType = {};
    });
  }

  selectType(type: RelationshipType) {
    this._currentType = type;
  }

  cancelUpdate() {
    this._currentType = {};
  }

  deleteType(typeId: number) {
    this._relService.deleteType(typeId).subscribe(
      data => {
        this.toastr.info('Tipo eliminado');
      },
      (err: Error) => {
        this.toastr.error(err.message, err.name);
      }
    );
  }

  updateType(type: RelationshipType) {
    this._relService.updateType(type.id, type).subscribe(
      data => {
        this.toastr.success(type.name, 'Tipo editado');
        this._types = this._relService.getTypes();
        this._currentType = {};
      },
      (err: Error) => {
        this.toastr.error(err.message, 'Error en la actualización');
      }
    );
  }
}
