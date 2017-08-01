import { Component, OnInit, Input } from '@angular/core';

import { Participant } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.css']
})

export class EntitiesListComponent implements OnInit {

  @Input() entities: Participant[];

  _filterEntities: Participant[] = [];
  _searchText: string;
  _searchColumns: Array<string> = ['FirstName', 'SecondName'];

  _sortTerm: any = {
    column: '',
    desc: true
  };

  constructor(
    private _util: UtilService,
    private _partServ: ParticipantsService
  ) { }

  ngOnInit() {
    this._filterEntities = this.entities;
    for (let i of this._filterEntities) {
      i.Rate = this._partServ.getRate(i);
    }
  }

  filterEntities() {
    this._filterEntities = this._util.searchFilter(this.entities, this._searchColumns , this._searchText);
  }

  sort(column: string) {
    this._sortTerm = {
      column: column,
      desc: !this._sortTerm.desc
    };
    this._filterEntities = this._util.sortBy(this._filterEntities, column, this._sortTerm.desc);
  }

}
