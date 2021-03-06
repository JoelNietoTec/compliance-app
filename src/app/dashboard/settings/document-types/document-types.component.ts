import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { DocumentType } from '../../../shared/models/documents.models';
import { DocumentsService } from '../../../shared/services/documents.service';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {
  _types = this._docServ.getTypes();
  _currentType: DocumentType = {};
  _newType: DocumentType = {};
  _table: TableOptions = {};

  constructor(private _docServ: DocumentsService, private toastr: ToastrService) {}

  ngOnInit() {
    this._table.columns = [
      { name: 'name', title: 'Nombre', sortable: true },
      { name: 'englishName', title: 'Nombre Inglés', sortable: true },
      { name: 'requiredIndividual', title: 'Req. Individuo', type: 'boolean' },
      { name: 'requiredEntity', title: 'Req. Entidad', type: 'boolean' }
    ];

    this._table.editable = true;
    this._table.deletable = true;
    this._table.style = 'table-sm table-squared';
    this._table.addMethod = 'inline';
    this._table.pageable = true;
    this._table.exportToCSV = true;

  }

  selectType(type: DocumentType) {
    this._currentType = type;
  }

  cancelUpdate() {
    this._currentType = {};
  }

  addType(type: DocumentType) {
    this._docServ.addType(type).subscribe(data => {
      this.toastr.success(data.name, 'Tipo Documento Creado');
      this._types = this._docServ.getTypes();
    });
  }

  deleteType(id: number) {
    this._docServ.deleteType(id).subscribe(data => {
      this.toastr.info('Tipo de documento eliminado');
    });
  }

  updateType(type: DocumentType) {
    this._docServ.updateType(type.id, type).subscribe(data => {
      this.toastr.success(type.name, 'Tipo Documento Editado');
      this._types = this._docServ.getTypes();
    });
  }
}
