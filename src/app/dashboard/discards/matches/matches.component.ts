import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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

  constructor(private _sanctionServ: SanctionsService, private _util: UtilService, private toastr: ToastsManager) {}

  ngOnInit() {
    this._sanctionServ.getDiscards().subscribe(data => {
      this._discards = this._util.sortBy(data, 'Date', true);
    });
    this.initTable();
  }

  initTable() {
    this._table.columns = [
      { name: 'Participant.FullName', title: 'Participante', filterable: true, readonly: true },
      { name: 'Sanction.FullTerm', title: 'Sancionado', filterable: true, readonly: true },
      { name: 'Pending', title: 'Pendiente', type: 'boolean', readonly: true },
      { name: 'Valid', title: 'Válida', type: 'boolean' }
    ];

    this._table.title = 'Coincidencias';

    this._table.editable = true;

    this._table.style = 'table table-sm table-squared';

    this._table.pageable = true;

    this._table.searcheable = true;
  }

  getMatches() {

    this._sanctionServ.getMatches(this._currentDiscardID).subscribe(data => {
      this._matches = data;
    });
  }

  validMatches(match: DiscardMatch, value: boolean) {
    return this._sanctionServ.validMatch(match.ID, value).subscribe(data => {
      match = data;
      this._matches = this._util.removeByID(this._matches, match.ID);
      if (value === true) {
        this.toastr.success('Coincidencia confirmada');
      } else {
        this.toastr.error('Coincidencia descartada');
      }
    });
  }
}
