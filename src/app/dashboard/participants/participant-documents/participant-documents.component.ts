import { Component, OnInit, Input } from '@angular/core';

import { Document, ParticipantDocument, DocumentType } from '../../../shared/models/documents.models';
import { UtilService } from '../../../shared/services/util.service';
import { Participant } from '../../../shared/models/participants.model';
import { DocumentsService } from '../../../shared/services/documents.service';

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
    private _util: UtilService
  ) {
    _docServ.getTypes()
      .subscribe(data => {
        this._types = data;
      });
  }

  ngOnInit() {
    console.log("hit");
    this._docServ.getDocByParticipant(this.participant.ID)
      .subscribe(data => {
        this._documents = data;
        console.log(this._documents);
      });
  }

  removeDoc(id: number) {
    this._docServ.deleteDoc(id)
      .subscribe(data => {
        this._documents = this._util.removeByID(this._documents, id);
      });
  }

  addDoc(doc: ParticipantDocument) {
    console.log(doc);
    this._docServ.saveDoc(doc)
      .subscribe(data => {
        this._documents.push(doc);
        this._toggleForm();
      });
  }

  _toggleForm() {
    this._showForm = !this._showForm;
  }
}
