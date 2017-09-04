import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DocumentType, ParticipantDocument } from '../../../shared/models/documents.models';
import { Participant } from '../../../shared/models/participants.model';
import { Country } from '../../../shared/models/country.model';
import { DocumentsService } from '../../../shared/services/documents.service';

interface FormDocument extends ParticipantDocument {
  formExpeditionDate?: NgbDateStruct;
  formExpirationDate?: NgbDateStruct;
}

@Component({
  selector: 'participant-document',
  templateUrl: './participant-document.component.html',
  styleUrls: ['./participant-document.component.css']
})

export class ParticipantDocumentComponent implements OnInit {

  @Input() types: Array<DocumentType>;
  @Input() doc?: FormDocument;
  @Input() participant: Participant;
  @Input() index: number;
  @Output() addDocument = new EventEmitter();
  @Output() removeDocument = new EventEmitter();
  @Output() caca = new EventEmitter();

  _countries: Array<Country> = JSON.parse(localStorage.getItem('countries'));
  _partDocument: FormDocument = { File: {} };
  _title: string;

  constructor(
    private _docServ: DocumentsService,
    private _dateFormatter: NgbDateParserFormatter
  ) {
  }

  ngOnInit() {
    this._title = `Document ${this.index + 1}`;
    if (this.doc) {
      this._partDocument = this.doc;
      this._partDocument.formExpeditionDate = this._dateFormatter.parse(this._partDocument.ExpeditionDate.toString());
      this._partDocument.formExpirationDate = this._dateFormatter.parse(this._partDocument.ExpirationDate.toString());
    } else {
      this._partDocument.ParticipantID = this.participant.ID;
    }
  }

  setFile(file: any) {
    console.log(file);
    this._partDocument.File.File = file;
  }

  saveDocument() {
    this._partDocument.ExpeditionDate = new Date(this._dateFormatter.format(this._partDocument.formExpeditionDate));
    this._partDocument.ExpirationDate = new Date(this._dateFormatter.format(this._partDocument.formExpirationDate));
    this.addDocument.emit(this._partDocument);
  }

  equals(c1, c2): boolean {
    return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  }

  removeDoc() {
    this.removeDocument.emit(this.doc.ID);
  }


}
