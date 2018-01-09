import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { SanctionsService } from '../../../shared/services/sanctions.service';
import {TableOptions} from '../../../shared/components/custom-table/custom-table.options';
import { UtilService } from '../../../shared/services/util.service';
import { Sanction, List } from '../../../shared/models/sanctions.model';

@Component({
  selector: 'discards-list',
  templateUrl: './discards-list.component.html',
  styleUrls: ['./discards-list.component.css']
})
export class DiscardsListComponent implements OnInit {
  _sanctions: Array<Sanction>;
  _pagedSanctions: Array<Sanction>;
  _lists: Array<List>;
  _currentListID: number;
  _matches: Array<any>;
  _pager: any = {};
  _table: TableOptions = {};

  constructor(private _sanctionServ: SanctionsService, private _util: UtilService, private toastr: ToastsManager) {}

  ngOnInit() {
    this._table.columns = [
      {name: 'Term1', title: 'Term. 1', type: 'text', sortable: true, filterable: true},
      {name: 'Term2', title: 'Term. 2', type: 'text', sortable: true, filterable: true},
      {name: 'Term3', title: 'Term. 3', type: 'text', sortable: true, filterable: true},
      {name: 'Term4', title: 'Term. 4', type: 'text', sortable: true, filterable: true},
      {name: 'Term5', title: 'Term. 5', type: 'text', sortable: true, filterable: true}
    ];

    this._table.pageable = true;
    this._table.searcheable = true;
    this._table.style = 'table table-sm table-squared';

    this._sanctionServ.getLists().subscribe(data => {
      this._lists = data;
    });
  }

  getSanctions() {
    this._sanctionServ.getSanctionsByList(this._currentListID).subscribe(data => {
      this._sanctions = data;
      this._table.items = this._sanctions;
      this.setPage(1);
    });
  }

  runDiscards() {
    this._sanctionServ.addDiscard(this._currentListID).subscribe(discard => {
      this._sanctionServ.runDiscard(discard.ID, this._sanctions).then(matches => {
        this.toastr.success(`${matches.length} concurrencias encontradas`, 'Comparación ejecutada');
        this._matches = matches;
        this.saveMatches(discard, this._matches.shift());
      });
    });
  }

  saveMatches(discard: any, match: any) {
    this._sanctionServ.saveMatches(discard.ID, match.sanctionID, match.participantID).subscribe(result => {
      if (this._matches.length) {
        this.saveMatches(discard, this._matches.shift());
      }
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this._pager.totalPages) {
      return;
    }

    this._pager = this._util.paginate(this._sanctions.length, page);

    this._pagedSanctions = this._sanctions.slice(this._pager.startIndex, this._pager.endIndex + 1);
  }
}
