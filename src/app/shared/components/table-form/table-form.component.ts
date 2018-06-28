import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../services/util.service';
import { Column } from '../custom-table/custom-table.options';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.css']
})
export class TableFormComponent implements OnInit {
  @Input() fields: Column[];
  @Input() item?: any = {};

  _filesToUpload: File[];

  constructor(public activeModal: NgbActiveModal, private _fileServ: FilesService, private _util: UtilService) {}

  ngOnInit() {
    this.resolveList();
  }

  updateObject(event) {
    this.fields.forEach(field => {
      if (field.type === 'object' && this.item[field.objectID]) {
        this.item[field.name] = this._util.filterByID(field.list, this.item[field.objectID]);
        this.item[field.objectText] = this.item[field.name][field.listDisplay];
      }
    });
  }

  setFile(file: any, field: Column) {
    this.uploadFile(file).subscribe(data => {
      this.item[field.name] = data;
      if (field.fileName) {
        this.item[field.fileName] = data.fileName;
      }
      if (field.fileID) {
        this.item[field.fileID] = data.id;
      }
    });
  }

  resolveList() {
    this.fields.forEach(field => {
      if (field.asyncList) {
        field.asyncList.subscribe(data => {
          field.list = this._util.sortBy(data, field.listDisplay);
        });
      }
    });
  }

  uploadFile(file: any) {
    this._filesToUpload = <File[]>file.target.files;
    return this._fileServ.uploadFiles(this._filesToUpload).map(files => {
      console.log(files);
      return files;
    });
  }
}
