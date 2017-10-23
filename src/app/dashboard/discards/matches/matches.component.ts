import { Component, OnInit } from '@angular/core';

import { Sanction, Discard, DiscardMatch, List } from '../../../shared/models/sanctions.model';
import { SanctionsService } from '../../../shared/services/sanctions.service';
import { UtilService } from '../../../shared/services/util.service';
import { TableOptions, Column } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'discard-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  _discards: Array<Discard> = [];
  _currentDiscardID: number;
  _matches: Array<DiscardMatch> = [];
  _table: TableOptions = {};

  constructor(private _sanctionServ: SanctionsService, private _util: UtilService) {}

  ngOnInit() {
    this._sanctionServ.getDiscards().subscribe(data => {
      this._discards = this._util.sortBy(data, 'Date', true);
    });

    this._table.columns = [
      { name: 'Participant.FullName', title: 'Participante', filterable: true },
      { name: 'Sanction.Term1', title: 'Sancionado', filterable: true },
      { name: 'Pending', title: 'Pendiente', type: 'boolean' },
      { name: 'Valid', title: 'Válida', type: 'boolean' }
    ];

    this._table.title = 'Coincidencias';

    this._table.style = 'table table-sm table-squared';

    this._table.pageable = true;

    this._table.searcheable = true;
  }

  getMatches() {
    this._sanctionServ.getMatches(this._currentDiscardID).subscribe(data => {
      console.log(data);
      this._matches = data;
      this._table.items = this._matches;
    });
  }
}
