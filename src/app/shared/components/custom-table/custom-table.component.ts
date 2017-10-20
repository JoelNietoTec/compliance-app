import { Component, OnInit, Input, Output, ViewChild, AfterViewChecked, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { PaginatorComponent } from '../paginator/paginator.component';
import { TableOptions, Column } from './custom-table.options';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, AfterViewChecked {
  @Input() items: Array<any>;
  @Input() options: TableOptions;
  @Output() editItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @Output() addItem = new EventEmitter();

  _newItem: any = {};
  _selectedItem: any = {};
  _sortColumn = '';
  _sortDesc = true;
  _pagedItems: Array<any> = [];
  _currentPage: any = {};
  _searchText: string = '';
  _filteredItems: Array<any> = [];
  _searchColumns: Array<string> = [];
  _pageSizes: Array<number> = [5, 10, 15, 20, 25];
  _deleteMessage = ['Eliminar elemento?', 'No podrá ser cancelado', 'question'];

  constructor(private _util: UtilService, private _cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this._filteredItems = this.items;
    this.setPage(1);
    this.options.columns.forEach(column => {
      if (column.filterable) {
        this._searchColumns.push(column.name);
      }
    });
  }

  selectItem(item: any) {
    this._selectedItem = item;
  }

  cancelSelect() {
    this._selectedItem = {};
  }

  ngAfterViewChecked() {
    this._cdr.detectChanges();
  }

  sortByColumn(column: Column) {
    if (column.name === this._sortColumn) {
      this._sortDesc = !this._sortDesc;
    }

    this._filteredItems = this._util.sortBy(this._filteredItems, column.name, this._sortDesc);
    this._sortColumn = column.name;
    this.pageItems();
  }

  getDetailsURL(ID: number): Array<string> {
    let URL = this.options.detailsURL.slice();
    URL.push(ID.toString());
    return URL;
  }

  setPage(pager: any) {
    this._currentPage.startIndex = pager.startIndex;
    this._currentPage.endIndex = pager.endIndex;
    this.pageItems();
  }

  pageItems() {
    this._pagedItems = this._filteredItems.slice(this._currentPage.startIndex, this._currentPage.endIndex + 1);
  }

  filterItems() {
    this._filteredItems = this._util.searchFilter(this.items, this._searchColumns, this._searchText);
    this.pageItems();
  }

  updateItem() {
    this.editItem.emit(this._selectedItem);
  }

  deleteItem(id: number) {
    this.removeItem.emit(id);
  }
}
