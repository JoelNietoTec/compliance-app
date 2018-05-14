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
import * as pdf from './pdf';
import { saveAs } from 'file-saver';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { DatePipe } from '@angular/common';
import { TableFormComponent } from '../table-form/table-form.component';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, AfterViewChecked, DoCheck, OnChanges {
  @Input() options: TableOptions;
  @Input() items: any[];
  @Output() editItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @Output() addItem = new EventEmitter();
  @ViewChild(TableFormComponent) form: TableFormComponent;

  _sorting: Boolean = false;
  _newItem: any = {};
  _selectedItem: any = {};
  _sortColumn: string;
  _sortDesc = true;
  _itemsCount: number;
  _originalCount: number;
  _pagedItems: Array<any> = [];
  _currentPage: any = {};
  _searchText = '';
  _filteredItems: Array<any>;
  _searchColumns: Array<string> = [];
  _pageSizes: Array<number> = [5, 10, 15, 20, 25];
  _deleteMessage = ['Eliminar elemento?', 'No podrá ser cancelado', 'question'];
  _idColumn: Column = {
    name: 'ID'
  };
  _filterValues: Array<string> = [];
  _visibleColumns: number;
  _booleanValues: any = [{ value: true, display: 'Sí' }, { value: false, display: 'No' }];
  constructor(
    public _conn: ConnectionService,
    private _util: UtilService,
    private _cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // this.initTable();
  }

  // Dispara el evento cuando los items están aún cargados
  ngOnChanges(model: SimpleChanges) {
    if (model.items) {
      if (this.items) {
        this.initTable();
        this._filteredItems = this.items;
        // this.filterItems();
      }
    }
  }

  // Inicializar la tabla
  initTable() {
    this._visibleColumns = 0; // inicializa el número de columnas visibles
    this.options.columns.forEach(column => {
      if (column.type === 'object') {
        column.objectText = `text${column.name}`;
        this.items.forEach(element => {
          this.getObjectText(element, column);
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

  openModal() {
    const modalRef = this.modalService.open(TableFormComponent);
    modalRef.result.then(
      result => {
        if (this._selectedItem.ID) {
          this.updateItem();
        } else {
          this.createItem();
        }
      },
      dismiss => {
        this.cancelSelect();
      }
    );
    modalRef.componentInstance.fields = this.options.columns;
    if (this._selectedItem.ID) {
      modalRef.componentInstance.item = this._selectedItem;
    } else {
      modalRef.componentInstance.item = this._newItem;
    }
  }

  getObjectText(item: any, column: Column) {
    item[`text${column.name}`] = this._util.getProperty(item, column.objectColumn);
  }

  getLookup(col: Column): Array<any> {
    let _values: Array<any> = [];
    if (col.type === 'object') {
      this.items.forEach(element => {
        if (!_values.includes(this._util.getProperty(element, col.objectColumn))) {
          _values.push(this._util.getProperty(element, col.objectColumn));
        }
      });
    } else {
      this.items.forEach(element => {
        if (!_values.includes(element[col.name])) {
          _values.push(element[col.name]);
        }
      });
    }
    _values = _values.sort();
    return _values;
  }

  ngDoCheck() {
    if (this.items) {
      if (!this.options.pageable) {
        this._filteredItems = this.items;
        this._pagedItems = this._filteredItems;
        this.initTable();
      } else if (!this._filteredItems) {
        this._filteredItems = this.items;
        this.filterItems();
      } else {
        if (this._originalCount !== this.items.length) {
          this.initTable();
          this._filteredItems = this.items;
          this._itemsCount = this._filteredItems.length;
          this._originalCount = this.items.length;
        }
      }
    }
  }

  selectItem(item: any) {
    this._selectedItem = Object.assign({}, this._selectedItem, item);
    if (this.options.addMethod === 'modal') {
      this.openModal();
    }
  }

  generatePDF() {
    pdf.generatePDF(this.options.columns, this.itemsToReports(true), this.options.title);
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
    this._sorting = true;
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

  getDetailsURL(ID: number): String[] {
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
    this._sorting = false;
    this._filteredItems = this._util.searchFilter(this.items, this._searchColumns, this._searchText);
    if (this.options.pageable) {
      this._itemsCount = this._filteredItems.length;
      this.pageItems();
    } else {
      this._pagedItems = this._filteredItems;
    }
  }

  createItem() {
    // this.options.columns.forEach(column => {
    //   if (column.type === 'object') {
    //     let id: number;
    //     id = this._newItem[column.objectID];
    //     this._newItem[column.name] = this._util.filterByID(column.list, this._newItem[column.objectID]);
    //     this.getObjectText(this._newItem, column);
    //   }
    // });
    this.addItem.emit(this._newItem);
    this._newItem = {};
  }

  attachNewItem(item: any) {
    this.options.columns.forEach(column => {
      if (column.type === 'object') {
        let id: number;
        id = item[column.objectID];
        item[column.name] = this._util.filterByID(column.list, item[column.objectID]);
        this.getObjectText(item, column);
      }
    });
    this.items.push(item);
  }

  updateItem() {
    this._pagedItems = this._util.updateItem(this._selectedItem, this._pagedItems);
    this.items = this._util.updateItem(this._selectedItem, this.items);
    this._filteredItems = this._util.updateItem(this._selectedItem, this._filteredItems);
    // item = this._selectedItem;
    this.editItem.emit(this._selectedItem);
    this._selectedItem = {};
  }

  deleteItem(id: number) {
    this.removeItem.emit(id);
    this.items = this._util.removeByID(this.items, id);
    this.filterItems();
  }

  exportCSV() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.itemsToReports());
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let filename: string;
    const date = new Date();

    if (this.options.title) {
      filename = `${this.options.title} - ${date.toLocaleString()}.xlsx`;
    } else {
      filename = `Export - ${date.toLocaleString()}.xlsx`;
    }

    const wbout: string = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([this.s2ab(wbout)]), filename);
    // console.log(this.itemsToReports());
  }

  s2ab(s: string): ArrayBuffer {
    const buf: ArrayBuffer = new ArrayBuffer(s.length);
    const view: Uint8Array = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      // tslint:disable-next-line:no-bitwise
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

  getClassRate(value: string, col: Column) {
    if (col.rateField) {
      switch (value) {
        case 'Incompleto':
          return `${col.customClasses} text-secondary`;
        case 'Bajo':
          return `${col.customClasses} text-success`;
        case 'Medio':
          return `${col.customClasses} text-warning`;
        case 'Alto':
          return `${col.customClasses} text-danger`;
      }
    }
  }

  itemsToReports(visible?: Boolean): any[] {
    const items = [];
    this._filteredItems.forEach(item => {
      const object = {};
      this.options.columns.forEach(column => {
        if (!column.hidden || !visible) {
          if (column.type === 'object') {
            object[column.title] = this._util.getProperty(item, column.objectColumn);
          } else if (column.type === 'date') {
            object[column.title] = this.datePipe.transform(this._util.getProperty(item, column.name), 'dd/MM/yyyy');
          } else {
            object[column.title] = this._util.getProperty(item, column.name);
          }
        }
      });
      items.push(object);
    });
    return items;
  }
}
