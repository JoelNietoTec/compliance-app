import { Component, OnInit } from '@angular/core';

import { DocumentType } from '../../../shared/models/documents.models';
import { DocumentsService } from '../../../shared/services/documents.service';

@Component({
  selector: 'app-document-types',
  templateUrl: './document-types.component.html',
  styleUrls: ['./document-types.component.css']
})
export class DocumentTypesComponent implements OnInit {

  _types: Array<DocumentType>;

  constructor(
    private _docServ: DocumentsService
  ) { }

  ngOnInit() {
    this._docServ.getTypes()
      .subscribe(data => {
        this._types = data;
      });
  }

}
