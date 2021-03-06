import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

import { UtilService } from '../../../shared/services/util.service';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges{
  @Input() itemsCount: number;
  @Output() paginate = new EventEmitter();

  _pager: any = {};
  private _count: number;
  _pageSize;
  _sizes: Array<number>;

  constructor(private _util: UtilService) {}

  ngOnInit() {
    this._sizes = [5, 10, 15, 20];
    this._pageSize = 10;
    this.setPage(1);
  }

  ngOnChanges(changes: SimpleChanges) {
    const count: SimpleChange = changes.itemsCount;
    this._count = count.currentValue;
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this._pager.totalPages) {
      return;
    }

    this._pager = this._util.paginate(this._count, page, parseInt(this._pageSize));

    this.paginate.emit(this._pager);
  }
}
