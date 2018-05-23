import { Component, OnInit } from '@angular/core';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { SanctionListsService } from '../../../shared/services/sanction-lists.service';
import { SanctionList } from '../../../shared/models/sanctions.model';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sanction-lists',
  templateUrl: './sanction-lists.component.html',
  styleUrls: ['./sanction-lists.component.css']
})
export class SanctionListsComponent implements OnInit {
  _table: TableOptions = {};
  _lists: Observable<SanctionList[]>;

  constructor(private _listServ: SanctionListsService, private toastr: ToastrService) {}

  ngOnInit() {
    this._table.title = 'Fuentes Listas';
    this._table.showTitle = true;
    this._table.pageable = true;
    this._table.exportToCSV = true;
    this._table.searcheable = true;
    this._table.editable = true;
    this._table.creatable = true;
    this._table.addMethod = 'modal';
    this._table.style = 'table-sm table-striped table-squared';

    this._table.columns = [
      { name: 'ID', hidden: true, readonly: true },
      { name: 'Name', title: 'Nombre', sortable: true, filterable: true },
      { name: 'URL', title: 'Dirección', sortable: true, filterable: true },
      { name: 'NameSpace', title: 'Namespace', sortable: true, hidden: true },
      { name: 'ElementIDs', title: 'Elementos' },
      { name: 'TermField', title: 'Términos de búsqueda', hidden: true },
      { name: 'CommentsField', title: 'Comentarios', hidden: true },
      { name: 'CountryField', title: 'País', hidden: true },
      { name: 'ActiveSearch', title: 'Activo', type: 'boolean' },
      { name: 'LoadDate', title: 'Últ. Act', type: 'datetime', readonly: true }
    ];

    this._lists = this._listServ.getLists();
  }

  addList(list: SanctionList) {
    this._listServ.addList(list).subscribe(
      data => {
        this.toastr.success(list.Name, 'Lista agregada');
        this._lists = this._listServ.getLists();
      },
      (err: Error) => {
        this.toastr.error(err.message, 'Ocurrió un error');
        this._lists = this._listServ.getLists();
      }
    );
  }

  editList(list: SanctionList) {
    this._listServ.updateList(list.ID, list).subscribe(
      data => {
        this.toastr.success(list.Name, 'Lista actualizada');
        this._lists = this._listServ.getLists();
      },
      (err: Error) => {
        this.toastr.error(err.message, 'Ocurrió un error');
        this._lists = this._listServ.getLists();
      }
    );
  }

  loadList() {
    this._listServ.getLists().subscribe(data => {
      data.forEach(list => {
        if (list.ActiveSearch) {
          this._listServ.loadList(list).subscribe(count => {
            this.toastr.success(`${count} elementos actualizados`, `Lista ${list.Name} actualizada`);
          });
        }
      });
    });
    // this._listServ.getList(2).subscribe(data => {
    //   this._listServ.loadList(data).subscribe(count => {
    //     this.toastr.success(`${count} elementos actualizados`, `Lista ${data.Name} actualizada`);
    //   });
    // });
  }
}
