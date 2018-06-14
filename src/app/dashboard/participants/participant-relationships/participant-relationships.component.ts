import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ParticipantRelationship, RelationshipType } from '../../../shared/models/relationships.model';
import { Participant } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { RelationshipsService } from '../../../shared/services/relationships.service';
import { UtilService } from '../../../shared/services/util.service';
import { ParticipantRelationshipComponent } from '../participant-relationship/participant-relationship.component';

@Component({
  selector: 'participant-relationships',
  templateUrl: './participant-relationships.component.html',
  styleUrls: ['./participant-relationships.component.css']
})
export class ParticipantRelationshipsComponent implements OnInit, OnChanges {
  @Input() participant: Participant;

  _currentRelationship: ParticipantRelationship = {};
  _relationships: Array<ParticipantRelationship>;

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private _partService: ParticipantsService,
    private _relService: RelationshipsService,
    private _util: UtilService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this._currentRelationship.Participant = this.participant;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'participant') {
        this.getRelationships();
      }
    }
  }

  getRelationships() {
    this._relService.getRelationships(this.participant.id).subscribe(data => {
      this._relationships = data;
    });
  }

  open() {
    const modalRef = this.modalService.open(ParticipantRelationshipComponent);

    modalRef.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        this.addRelationShip();
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

    modalRef.componentInstance.relation = this._currentRelationship;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addRelationShip() {
    const relationship: ParticipantRelationship = {};

    relationship.RelationshipTypeID = this._currentRelationship.Type.id;
    relationship.ParticipantID = this._currentRelationship.Participant.id;
    relationship.RelatedParticipantID = this._currentRelationship.RelatedParticipant.id;
    this._relService.addRelationship(relationship).subscribe(data => {
      this.toastr.success(data.RelatedParticipant.shortName, 'Relación agregada');
      this._relationships.push(data);
    });
  }

  removeRelation(id: number) {
    this._relService.deleteRelationship(id).subscribe(data => {
      this.toastr.info('Relación eliminada');
      this._relationships = this._util.removeByID(this._relationships, id);
    });
  }
}
