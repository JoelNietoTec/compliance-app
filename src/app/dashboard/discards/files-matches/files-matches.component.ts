import { Component, OnInit } from '@angular/core';

import { UtilService } from '../../../shared/services/util.service';
import { ComparisonsService } from '../../../shared/services/comparisons.service';
import { Comparison, Match } from '../../../shared/models/sanctions.model';
import { Column, TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'files-matches',
  templateUrl: './files-matches.component.html',
  styleUrls: ['./files-matches.component.css']
})
export class FilesMatchesComponent implements OnInit {
  _comparisons: Comparison[];
  _currentComparisonID: number;
  _matches: Match[];
  _table: TableOptions = {};

  constructor(private _util: UtilService, private _compService: ComparisonsService) {}

  ngOnInit() {
    this._compService.getComparisons().subscribe(data => {
      this._comparisons = this._util.sortBy(data, 'Date', true);
    });

    this.InitTable();
  }

  InitTable() {
    this._table = {};

    this._table.columns = [
      { name: 'ParticipantID', title: '#', readonly: true },
      { name: 'Participant.FullName', title: 'Participant', readonly: true },
      { name: 'Term1', title: 'Término', readonly: true },
      { name: 'Score', title: 'Puntaje', readonly: true },
      { name: 'Confirmed', title: 'Confirmado', type: 'boolean' }
    ];

    this._table.pageable = true;
    this._table.editable = true;
    this._table.exportToCSV = true;
    this._table.style = 'table-sm table-squared';
  }

  getMatches() {
    this._matches = [];
    this._compService.getMatchesbyComparison(this._currentComparisonID).subscribe(data => {
      data.forEach(element => {
        element.Confirmed = null;
      });
      this.InitTable();
      this._matches = data;
    });
  }
}
