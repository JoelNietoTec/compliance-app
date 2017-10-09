import { Component, OnInit } from '@angular/core';

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
  _selType: RelationshipType = {};

  constructor(
    private _relService: RelationshipsService
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
        this._types.push(data);
        this._newType = {};
      });
  }

}
