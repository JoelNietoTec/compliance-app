import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ParticipantRelationship, RelationshipType } from '../../../shared/models/relationships.model';
import { Participant } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { RelationshipsService } from '../../../shared/services/relationships.service';
import { ParticipantRelationshipComponent } from '../participant-relationship/participant-relationship.component';

@Component({
  selector: 'participant-relationships',
  templateUrl: './participant-relationships.component.html',
  styleUrls: ['./participant-relationships.component.css']
})

export class ParticipantRelationshipsComponent implements OnInit {
  @Input() relationships: Array<ParticipantRelationship>;
  @Input() participant: Participant;

  _currentRelationship: ParticipantRelationship = {};
  _relationships: Array<ParticipantRelationship>;

  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private _partService: ParticipantsService,
    private _relService: RelationshipsService
  ) { }

  ngOnInit() {
    this._currentRelationship.Participant = this.participant;

    this._relService.getRelationships(this.participant.ID)
      .subscribe(data => {
        this._relationships = data;
      });
  }

  open() {
    // this.modalService.open(content).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    //   console.log(this.closeResult);
    //   this.addRelationShip();
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   console.log(this.closeResult);
    // });
    const modalRef = this.modalService.open(ParticipantRelationshipComponent);

    modalRef.result
      .then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.addRelationShip();
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

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
    this._partService.addRelationship(this._currentRelationship)
      .subscribe(data => {
        console.log(data);
      });
  }

}
