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

  constructor(private _util: UtilService, private _cdr: ChangeDetectorRef, private modalService: NgbModal) {}

  ngOnInit() {
    this.options.columns.forEach(column => {
      if (column.filterable) {
        this._searchColumns.push(column.name);
      }
    });
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
}
