import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { SanctionsService } from '../../../shared/services/sanctions.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { UtilService } from '../../../shared/services/util.service';
import { Sanction, List, SanctionList, SanctionedItem } from '../../../shared/models/sanctions.model';
import { Observable } from 'rxjs/Observable';
import { SanctionListsService } from '../../../shared/services/sanction-lists.service';

@Component({
  selector: 'discards-list',
  templateUrl: './discards-list.component.html',
  styleUrls: ['./discards-list.component.css']
})
export class DiscardsListComponent implements OnInit {
  _sanctions: Observable<SanctionedItem[]>;
  _pagedSanctions: Array<Sanction>;
  _lists: Observable<SanctionList[]>;
  _currentListID: number;
  _matches: Array<any>;
  _pager: any = {};
  _table: TableOptions = {};

  constructor(
    private _sanctionServ: SanctionsService,
    private _listServ: SanctionListsService,
    private _util: UtilService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this._table.columns = [
      { name: 'fullTerm', title: 'Término', sortable: true, filterable: true },
      { name: 'comments', title: 'Comentarios', sortable: true, filterable: true },
      { name: 'country', title: 'País', lookup: true }
    ];

    this._table.pageable = true;
    this._table.searcheable = true;
    this._table.style = 'table table-sm table-squared';

    this._lists = this._listServ.getLists();
  }

  getSanctions() {
    this._sanctions = this._listServ.getItemsByList(this._currentListID);
  }

  runDiscards() {
    this._listServ.runDiscard().subscribe(data => {
      console.log(data);
    });
  }

  saveMatches(discard: any, match: any) {
    this._sanctionServ.saveMatches(discard.ID, match.sanctionID, match.participantID).subscribe(result => {
      if (this._matches.length) {
        this.saveMatches(discard, this._matches.shift());
      }
    });
  }
}
