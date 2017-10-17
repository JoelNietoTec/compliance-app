import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { SanctionsService } from '../../../shared/services/sanctions.service';
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

  _pager: any = {};

  constructor(
    private _sanctionServ: SanctionsService,
    private _util: UtilService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    this._sanctionServ.getLists()
      .subscribe(data => {
        this._lists = data;
      });
  }

  getSanctions() {
    this._sanctionServ.getSanctionsByList(this._currentListID)
      .subscribe(data => {
        this._sanctions = data;
        this.setPage(1);
      });
  }

  runDiscards() {
    this._sanctionServ.runDiscard(this._sanctions)
      .then(data => {
        console.log(data);
        this.toastr.success(`${data.length} concurrencias encontradas`, 'Comparación ejecutada');
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
