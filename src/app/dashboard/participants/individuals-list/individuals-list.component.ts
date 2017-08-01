import { Component, OnInit, Input } from '@angular/core';

import { Participant } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'individuals-list',
  templateUrl: './individuals-list.component.html',
  styleUrls: ['./individuals-list.component.css']
})

export class IndividualsListComponent implements OnInit {

  @Input() individuals: Participant[];

  _filterIndividuals: Participant[] = [];
  _searchText: string;
  _sortTerm: any = {
    column: '',
    desc: true
  };
  _searchColumns: Array<string> = [
    'FirstName',
    'SecondName',
    'ThirdName',
    'FourthName'
  ];


  constructor(
    private _util: UtilService,
    private _partServ: ParticipantsService
  ) { }

  ngOnInit() {
    this._filterIndividuals = this.individuals;
    for (let i of this._filterIndividuals) {
      i.Rate = this._partServ.getRate(i);
    }
  }

  filterIndividuals() {
    this._filterIndividuals = this._util.searchFilter(this.individuals, this._searchColumns, this._searchText);
    // this._filterIndividuals = this._partServ.searchParticipant(this.individuals, this._searchText)
  }

  sort(column: string) {
    this._sortTerm = {
      column: column,
      desc: !this._sortTerm.desc
    };
    this._filterIndividuals = this._util.sortBy(this._filterIndividuals, column, this._sortTerm.desc);
  }
}
