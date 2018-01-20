import { Component, OnInit } from '@angular/core';

import { UtilService } from '../../../shared/services/util.service';
import { ComparisonsService } from '../../../shared/services/comparisons.service';
import { Comparison, Match } from '../../../shared/models/sanctions.model';

@Component({
  selector: 'files-matches',
  templateUrl: './files-matches.component.html',
  styleUrls: ['./files-matches.component.css']
})
export class FilesMatchesComponent implements OnInit {
  _comparisons: Comparison[];
  _currentComparisonID: number;
  _matches: Match[];
  constructor(private _util: UtilService, private _compService: ComparisonsService) {}

  ngOnInit() {
    this._compService.getComparisons().subscribe(data => {
      this._comparisons = this._util.sortBy(data, 'Date', true);
    });
  }

  getMatches() {
    this._compService.getMatchesbyComparison(this._currentComparisonID).subscribe(data => {
      this._matches = data;
    });
  }
}
