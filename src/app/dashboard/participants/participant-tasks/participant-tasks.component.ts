import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';
import { PendingDocument, Participant } from '../../../shared/models/participants.model';

@Component({
  selector: 'participant-tasks',
  templateUrl: './participant-tasks.component.html',
  styleUrls: ['./participant-tasks.component.css']
})
export class ParticipantTasksComponent implements OnInit {
  @Input() participant: Participant;

  _pending: Array<PendingDocument>;
  constructor(private _route: ActivatedRoute, private _partServ: ParticipantsService, private _util: UtilService) {}

  ngOnInit() {
    this._partServ.getPendingDocuments(this.participant.id).subscribe(data => {
      this._pending = data;
    });
  }
}
