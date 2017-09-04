import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Participant } from '../../../shared/models/participants.model';
import { RelationshipType, ParticipantRelationship } from '../../../shared/models/relationships.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { RelationTypesService } from '../../../shared/services/relationshiptypes.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'participant-relationship',
  templateUrl: './participant-relationship.component.html',
  styleUrls: ['./participant-relationship.component.css']
})

export class ParticipantRelationshipComponent implements OnInit {

  @Input() relation: ParticipantRelationship;
  _participants: Array<Participant>;
  _types: Array<RelationshipType>;
  _searchColumns: Array<string> = [
    'FirstName',
    'SecondName',
    'ThirdName',
    'FourthName'
  ];


  constructor(
    private _partService: ParticipantsService,
    private _typeService: RelationTypesService,
    private _util: UtilService
  ) {
    _partService.getParticipants()
      .subscribe(data => {
        this._participants = data;
      });

    _typeService.getTypes()
      .subscribe(data => {
        this._types = data;
      });
  }

  ngOnInit() { }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this._util.searchFilter(this._participants, this._searchColumns, term)
      );


  formatter = (x: { FirstName: string; ThirdName: string }) => x.FirstName + ' ' + x.ThirdName;
}
