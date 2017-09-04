import { Component, OnInit } from '@angular/core';

import { RelationshipType } from '../../../shared/models/relationships.model';
import { RelationTypesService } from '../../../shared/services/relationshiptypes.service';

@Component({
  selector: 'app-relationship-types',
  templateUrl: './relationship-types.component.html',
  styleUrls: ['./relationship-types.component.css']
})
export class RelationshipTypesComponent implements OnInit {

  _types: Array<RelationshipType>;
  _newType: RelationshipType = {};
  _selType: RelationshipType = {};

  constructor(
    private _typeService: RelationTypesService
  ) { }

  ngOnInit() {
    this.getTypes();
  }

  getTypes() {
    this._typeService.getTypes()
      .subscribe(data => {
        this._types = data;
      });
  }

  addType() {
    this._typeService.createType(this._newType)
      .subscribe(data => {
        this._types.push(data);
        this._newType = {};
      });
  }

}
