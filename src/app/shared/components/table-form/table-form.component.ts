import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../services/util.service';
import { Column } from '../custom-table/custom-table.options';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})
export class TableFormComponent implements OnInit {
  @Input() fields: Column[];
  @Input() item?: any = {};

  constructor(public activeModal: NgbActiveModal, private _util: UtilService) {}

  ngOnInit() {}

  updateObject(event) {
    this.fields.forEach(field => {
      if (field.type === 'object') {
        this.item[field.name] = this._util.filterByID(field.list, this.item[field.objectID]);
        this.item[field.objectText] = this.item[field.name][field.listDisplay];
      }
    });
  }
}
