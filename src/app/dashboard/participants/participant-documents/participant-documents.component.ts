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
  _documents: Observable<ParticipantDocument[]>;
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
    this._documents = this._docServ.getDocByParticipant(this.participant.id);
    this._types = this._docServ.getTypesByParticipant(this.participant.participantTypeId);
    this._table.title = 'Documentos';
    this._table.editable = true;
    this._table.style = 'table-striped';
    this._table.pageable = true;
    this._table.addMethod = 'modal';
    this._table.columns = [
      { name: 'documentCode', title: 'Nro. Documento' },
      {
        name: 'type',
        title: 'Tipo',
        type: 'object',
        objectColumn: 'type.name',
        asyncList: this._types,
        sortable: true,
        listDisplay: 'name',
        listID: 'id',
        objectID: 'documentTypeId'
      },
      { name: 'expeditionDate', title: 'Fec. Expedición', type: 'date' },
      { name: 'expirationDate', title: 'Fec. Expiración', type: 'date' },
      {
        name: 'country',
        title: 'País Expedición',
        type: 'object',
        objectColumn: 'country.name',
        asyncList: this._countries,
        sortable: true,
        listDisplay: 'name',
        listID: 'id',
        objectID: 'countryId'
      },
      { name: 'document', title: 'Documento', type: 'file', fileURL: this._conn.fileURL, fileID: 'documentId', fileName: 'filePath' }
    ];
  }

  removeDoc(id: number) {
    this._docServ.deleteDoc(id).subscribe(data => {
      this.toastr.info('Documento eliminado');
      this._documents = this._docServ.getDocByParticipant(this.participant.id);
    });
  }

  addDoc(doc: ParticipantDocument) {
    doc.participantId = this.participant.id;
    this._docServ.saveDoc(doc).subscribe(
      data => {
        this.toastr.success(data.type.name, 'Documento creado');
        this._documents = this._docServ.getDocByParticipant(this.participant.id);
      },
      (err: Error) => this.toastr.error(err.message, 'Ocurrió un error')
    );
  }

  updateDoc(doc: ParticipantDocument) {
    this._docServ.updateDocument(doc.id, doc).subscribe(data => {
      this.toastr.success(doc.type.name, 'Documento actualizado');
      this._documents = this._docServ.getDocByParticipant(this.participant.id);
    });
  }

}
