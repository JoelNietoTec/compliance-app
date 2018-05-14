import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ParticipantDocument, DocumentType } from '../../../shared/models/documents.models';
import { UtilService } from '../../../shared/services/util.service';
import { Participant } from '../../../shared/models/participants.model';
import { DocumentsService } from '../../../shared/services/documents.service';
import { ConnectionService } from '../../../shared/services/connection.service';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';
import { Country } from '../../../shared/models/country.model';
import { CountriesService } from '../../../shared/services/countries.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'participant-documents',
  templateUrl: './participant-documents.component.html',
  styleUrls: ['./participant-documents.component.css']
})
export class ParticipantDocumentsComponent implements OnInit {
  @Input() participant: Participant;

  _types: Observable<DocumentType[]>;
  _showForm: Boolean = false;
  _documents: Observable<DocumentType[]>;
  _countries = this._countryServ.getCountries();
  _table: TableOptions = {};

  constructor(
    private _docServ: DocumentsService,
    private _countryServ: CountriesService,
    private _util: UtilService,
    private toastr: ToastrService,
    public _conn: ConnectionService
  ) {}

  ngOnInit() {
    this._documents = this._docServ.getDocByParticipant(this.participant.ID);
    this._types = this._docServ.getTypesByParticipant(this.participant.ParticipantTypeID);
    this._table.title = 'Documentos';
    this._table.editable = true;
    this._table.style = 'table-sm table-squared';
    this._table.pageable = true;
    this._table.addMethod = 'modal';
    this._table.columns = [
      { name: 'DocumentCode', title: 'Nro. Documento' },
      {
        name: 'DocumentType',
        title: 'Tipo',
        type: 'object',
        objectColumn: 'DocumentType.Name',
        asyncList: this._types,
        sortable: true,
        listDisplay: 'Name',
        listID: 'ID',
        objectID: 'DocumentTypeID'
      },
      { name: 'ExpeditionDate', title: 'Fec. Expedición', type: 'date' },
      { name: 'ExpirationDate', title: 'Fec. Expiración', type: 'date' },
      {
        name: 'Country',
        title: 'País Expedición',
        type: 'object',
        objectColumn: 'Country.Name',
        asyncList: this._countries,
        sortable: true,
        listDisplay: 'Name',
        listID: 'ID',
        objectID: 'CountryID'
      },
      { name: 'FilePath', title: 'Documento', type: 'file', fileURL: this._conn.fileURL }
    ];
  }

  removeDoc(id: number) {
    this._docServ.deleteDoc(id).subscribe(data => {
      this.toastr.info('Documento eliminado');
      this._documents = this._docServ.getDocByParticipant(this.participant.ID);
    });
  }

  addDoc(doc: ParticipantDocument) {
    doc.ParticipantID = this.participant.ID;
    this._docServ.saveDoc(doc).subscribe(
      data => {
        this.toastr.success(data.DocumentType.Name, 'Documento creado');
        this._documents = this._docServ.getDocByParticipant(this.participant.ID);
      },
      (err: Error) => this.toastr.error(err.message, 'Ocurrió un error')
    );
  }

  updateDoc(doc: ParticipantDocument) {
    this._docServ.updateDocument(doc.ID, doc).subscribe(data => {
      this.toastr.success(doc.DocumentType.Name, 'Documento actualizado');
      this._documents = this._docServ.getDocByParticipant(this.participant.ID);
    });
  }

}
