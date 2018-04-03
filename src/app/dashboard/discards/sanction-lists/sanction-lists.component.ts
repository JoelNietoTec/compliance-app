import { Component, OnInit } from '@angular/core';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { SanctionListsService } from '../../../shared/services/sanction-lists.service';
import { SanctionList } from '../../../shared/models/sanctions.model';

@Component({
  selector: 'sanction-lists',
  templateUrl: './sanction-lists.component.html',
  styleUrls: ['./sanction-lists.component.css']
})
export class SanctionListsComponent implements OnInit {
  _table: TableOptions = {};
  _lists: SanctionList[];

  constructor(private _listServ: SanctionListsService) {}

  ngOnInit() {
    this._table.title = 'Fuentes Listas';
    this._table.showTitle = true;
    this._table.pageable = true;
    this._table.exportToCSV = true;
    this._table.searcheable = true;
    this._table.editable = true;
    this._table.creatable = true;
    this._table.addMethod = 'inline';
    this._table.style = 'table-sm table-striped table-squared';

    this._table.columns = [
      { name: 'ID', hidden: true, readonly: true },
      { name: 'Name', title: 'Nombre', sortable: true, filterable: true },
      { name: 'URL', title: 'Dirección', sortable: true, filterable: true },
      { name: 'ElementIDs', title: 'Elementos' },
      { name: 'TermField', title: 'Términos de búsqueda' },
      { name: 'CommentsField', title: 'Comentarios' },
      { name: 'CountryField', title: 'País' },
      { name: 'ActiveSearch', title: 'Activo', type: 'boolean' }
    ];

    this._listServ.getLists().subscribe(data => {
      this._lists = data;
    });
  }

  addList(list: SanctionList) {
    this._listServ.addList(list).subscribe(data => {
      this._lists.push(data);
    });
  }

  getData() {
    this._listServ.getListData(this._lists[0]);
  }
}
