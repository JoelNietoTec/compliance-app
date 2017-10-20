import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { RelationshipType } from '../../../shared/models/relationships.model';
import { RelationshipsService } from '../../../shared/services/relationships.service';

@Component({
  selector: 'app-relationship-types',
  templateUrl: './relationship-types.component.html',
  styleUrls: ['./relationship-types.component.css']
})
export class RelationshipTypesComponent implements OnInit {

  _types: Array<RelationshipType>;
  _newType: RelationshipType = {};
  _currentType: RelationshipType = {};

  constructor(
    private _relService: RelationshipsService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.getTypes();
  }

  getTypes() {
    this._relService.getTypes()
      .subscribe(data => {
        this._types = data;
      });
  }

  addType() {
    this._relService.createType(this._newType)
      .subscribe(data => {
        this.toastr.success(data.Name, 'Tipo creado');
        this._types.push(data);
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
    this._relService.deleteType(typeId)
      .subscribe(data => {
        this.toastr.info('Tipo eliminado');
      }, (err: Error) => {
        this.toastr.error(err.message, err.name);
      });
  }

  updateType() {
    this._relService.updateType(this._currentType.ID, this._currentType)
      .subscribe(data => {
        this.toastr.success(this._currentType.Name, 'Tipo editado');
        this._currentType = {};
      });
  }

}
