import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Document, ParticipantDocument, DocumentType } from '../../../shared/models/documents.models';
import { UtilService } from '../../../shared/services/util.service';
import { Participant } from '../../../shared/models/participants.model';
import { DocumentsService } from '../../../shared/services/documents.service';
import { ConnectionService } from '../../../shared/services/connection.service';

@Component({
  selector: 'participant-documents',
  templateUrl: './participant-documents.component.html',
  styleUrls: ['./participant-documents.component.css']
})
export class ParticipantDocumentsComponent implements OnInit {
  @Input() participant: Participant;

  _types: Array<DocumentType>;
  _showForm: Boolean = false;
  _documents: Array<ParticipantDocument>;

  constructor(
    private _docServ: DocumentsService,
    private _util: UtilService,
    private toastr: ToastsManager,
    public _conn: ConnectionService
  ) {}

  ngOnInit() {
    this._docServ.getTypesByParticipant(this.participant.ParticipantTypeID).subscribe(data => {
      this._types = this._util.sortBy(data, 'Name');
    });

    this._docServ.getDocByParticipant(this.participant.ID).subscribe(data => {
      this._documents = data;
    });
  }

  removeDoc(id: number) {
    this._docServ.deleteDoc(id).subscribe(data => {
      this._documents = this._util.removeByID(this._documents, id);
    });
  }

  addDoc(doc: ParticipantDocument) {
    this._docServ.saveDoc(doc).subscribe(
      data => {
        this.toastr.success(data.DocumentType.Name, 'Documento Creado');
        this._documents.push(data);
        this._toggleForm();
      },
      (err: Error) => console.log(err.message)
    );
  }

  _toggleForm() {
    this._showForm = !this._showForm;
  }
}
