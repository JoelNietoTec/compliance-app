import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { DocumentType } from '../../../shared/models/documents.models';
import { DocumentsService } from '../../../shared/services/documents.service';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {

  _types: Array<DocumentType>;
  _currentType: DocumentType = {};
  _newType: DocumentType = {};

  constructor(
    private _docServ: DocumentsService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this._docServ.getTypes()
      .subscribe(data => {
        this._types = data;
      });
  }

  selectType(type: DocumentType) {
    this._currentType = type;
  }

  cancelUpdate() {
    this._currentType = {};
  }

  addType() {
    this._docServ.addType(this._newType)
      .subscribe(data => {
        this.toastr.success(data.Name, 'Tipo Documento Creado');
        this._types.push(data);
        this._newType = {};
      });
  }

  updateType() {
    this._docServ.updateType(this._currentType.ID, this._currentType)
      .subscribe(data => {
        this.toastr.success(this._currentType.Name, 'Tipo Documento Editado');
        this._currentType = {};
      });
  }

}
