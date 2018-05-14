import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DocumentType, ParticipantDocument } from '../../../shared/models/documents.models';
import { Participant } from '../../../shared/models/participants.model';
import { Country } from '../../../shared/models/country.model';
import { CountriesService } from '../../../shared/services/countries.service';
import { DocumentsService } from '../../../shared/services/documents.service';
import { UtilService } from '../../../shared/services/util.service';
import { FilesService } from '../../../shared/services/files.service';

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

  _countries: Country[];
  _filestoUpload: File[];
  _isLoading: Boolean = false;
  _partDocument: FormDocument;
  _title: string;

  constructor(
    private _docServ: DocumentsService,
    private _dateFormatter: NgbDateParserFormatter,
    private _countryServ: CountriesService,
    private _fileServ: FilesService,
    private _util: UtilService
  ) {}

  ngOnInit() {
    this._title = `Documento ${this.index + 1}`;
    if (this.doc) {
      this._partDocument = this.doc;
      this._partDocument.formExpeditionDate = this._dateFormatter.parse(this._partDocument.ExpeditionDate.toString());
      this._partDocument.formExpirationDate = this._dateFormatter.parse(this._partDocument.ExpirationDate.toString());
    } else {
      this._partDocument.ParticipantID = this.participant.ID;
    }

    this.getCountries();
  }

  getCountries() {
    this._countryServ.getCountries().subscribe(data => {
      this._countries = data;
      this._countries = this._util.sortBy(this._countries, 'Name');
    });
  }

  setFile(file: any) {
    this._filestoUpload = <Array<File>>file.target.files;
    this._fileServ.uploadFiles(this._filestoUpload).subscribe(data => {
      this._partDocument.FilePath = data;
    });
  }

  saveDocument() {
    this._partDocument.ExpeditionDate = new Date(this._dateFormatter.format(this._partDocument.formExpeditionDate));
    this._partDocument.ExpirationDate = new Date(this._dateFormatter.format(this._partDocument.formExpirationDate));
    this.addDocument.emit(this._partDocument);
  }

  // equals(c1, c2): boolean {
  //   return c1 && c2 ? c1.ID === c2.ID : c1 === c2;
  // }

  removeDoc() {
    this.removeDocument.emit(this.doc.ID);
  }
}
