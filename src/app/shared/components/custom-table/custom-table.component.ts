import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  DoCheck,
  SimpleChanges,
  ViewChild,
  AfterViewChecked,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PaginatorComponent } from '../paginator/paginator.component';
import { TableOptions, Column } from './custom-table.options';
import { UtilService } from '../../services/util.service';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, AfterViewChecked, DoCheck {
  @Input() options: TableOptions;
  @Output() editItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @Output() addItem = new EventEmitter();

  _newItem: any = {};
  _selectedItem: any = {};
  _sortColumn: string;
  _sortDesc = true;
  _itemsCount: number;
  _pagedItems: Array<any> = [];
  _currentPage: any = {};
  _searchText: string = '';
  _filteredItems: Array<any>;
  _searchColumns: Array<string> = [];
  _pageSizes: Array<number> = [5, 10, 15, 20, 25];
  _deleteMessage = ['Eliminar elemento?', 'No podrá ser cancelado', 'question'];
  _idColumn: Column = {
    name: 'ID'
  };
  _filterValues: Array<string> = [];
  _visibleColumns: number;

  constructor(private _util: UtilService, private _cdr: ChangeDetectorRef, private modalService: NgbModal) {}

  ngOnInit() {
    this.initTable();
  }

  initTable() {
    this._visibleColumns = 0;
    this.options.columns.forEach(column => {
      if (column.type === 'object') {
        column.objectText = `text${column.name}`;
        this.options.items.forEach(element => {
          element[`text${column.name}`] = this._util.getProperty(element, column.objectColumn);
        });
      }
      if (column.filterable) {
        this._searchColumns.push(column.name);
      }
      if (this.options.showID) {
        this.options.columns.push(this._idColumn);
      }
      if (this.options.lookup) {
        column.lookupValues = this.getLookup(column);
      }

      if (!column.hidden) {
        this._visibleColumns++;
      }
    });
  }

  getLookup(col: Column): Array<any> {
    let _values: Array<any> = [];

    if (col.type === 'object') {
      this.options.items.forEach(element => {
        if (!_values.includes(this._util.getProperty(element, col.objectColumn))) {
          _values.push(this._util.getProperty(element, col.objectColumn));
        }
      });
    } else {
      this.options.items.forEach(element => {
        if (!_values.includes(element[col.name])) {
          _values.push(element[col.name]);
        }
      });
    }

    _values = _values.sort();
    return _values;
  }

  ngDoCheck() {
    if (this.options.items) {
      if (!this.options.pageable) {
        this._filteredItems = this.options.items;
        this._pagedItems = this._filteredItems;
      } else if (!this._filteredItems) {
        this._filteredItems = this.options.items;
        this.filterItems();
      }
    }
  }

  selectItem(item: any) {
    if (this.options.editable) {
      this._selectedItem = item;
    }
  }

  changeFilter() {
    this.filterItems();
    for (const key in this._filterValues) {
      if (this._filterValues.hasOwnProperty(key)) {
        let col: Column;
        col = this.options.columns.find(item => item.name === key);
        const element = this._filterValues[key];
        if (element) {
          if (col.type === 'object') {
            this._filteredItems = this._filteredItems.filter(item => this._util.getProperty(item, col.objectColumn) === element);
          } else {
            this._filteredItems = this._filteredItems.filter(item => item[key] === element);
          }
        }
        this._itemsCount = this._filteredItems.length;
      }
    }
    this._sortColumn = '';
    this.pageItems();
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

    if (column.type === 'object') {
      this._filteredItems = this._util.sortBy(this._filteredItems, column.objectText, this._sortDesc);
    } else {
      this._filteredItems = this._util.sortBy(this._filteredItems, column.name, this._sortDesc);
    }

    this._sortColumn = column.name;

    this.pageItems();
  }

  getDetailsURL(ID: number): Array<string> {
    const URL = this.options.detailsURL.slice();
    URL.push(ID.toString());
    return URL;
  }

  setPage(pager: any) {
    this._currentPage.startIndex = pager.startIndex;
    this._currentPage.endIndex = pager.endIndex;
    if (this.options.pageable) {
      this.pageItems();
    } else {
      this._pagedItems = this._filteredItems;
    }
  }

  pageItems() {
    this._pagedItems = this._filteredItems.slice(this._currentPage.startIndex, this._currentPage.endIndex + 1);
  }

  filterItems() {
    this._filteredItems = this._util.searchFilter(this.options.items, this._searchColumns, this._searchText);
    if (this.options.pageable) {
      this._itemsCount = this._filteredItems.length;

      this.pageItems();
    } else {
      this._pagedItems = this._filteredItems;
    }
  }

  createItem() {
    this.addItem.emit(this._newItem);
    this._newItem = {};
  }

  updateItem() {
    this.editItem.emit(this._selectedItem);
    this._selectedItem = {};
  }

  deleteItem(id: number) {
    this.removeItem.emit(id);
    this.options.items = this._util.removeByID(this.options.items, id);
    this.filterItems();
  }

  exportCSV() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.itemsToReports());
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: string = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)]), 'Export.xlsx');
    // console.log(this.itemsToReports());
  }

  s2ab(s: string): ArrayBuffer {
    const buf: ArrayBuffer = new ArrayBuffer(s.length);
    const view: Uint8Array = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  itemsToReports(): Array<any> {
    const items = [];
    this._filteredItems.forEach(item => {
      const object = {};
      this.options.columns.forEach(column => {
        if (column.type === 'object') {
          object[column.title] = this._util.getProperty(item, column.objectColumn);
        } else {
          object[column.title] = this._util.getProperty(item, column.name);
        }
      });
      items.push(object);
    });
    return items;
  }
}
