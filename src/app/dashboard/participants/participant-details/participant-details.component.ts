import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Participant } from '../../../shared/models/participants.model';
import { Gender } from '../../../shared/models/genders.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';
import { Title } from '@angular/platform-browser';

interface ParticipantData extends Participant {
  Age?: number;
}

@Component({
  moduleId: module.id,
  selector: 'participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.css']
})
export class ParticipantDetailsComponent implements OnInit {
  _participant: ParticipantData;
  _participantCopy: Participant;

  constructor(private _route: ActivatedRoute, private title: Title, private _partServ: ParticipantsService, private _util: UtilService) {}

  ngOnInit() {
    this.getParticipant();
  }

  getParticipant() {
    this._route.params.subscribe(params => {
      this._partServ.getParticipant(params['id']).subscribe(data => {
        this.title.setTitle(`ProCompliance | Participante: ${data.shortName}`);
        this._participant = data;
        this._participantCopy = Object.assign({}, this._participant, data);
        this._participant.age = this._util.getAge(this._participant.birthDate);
      });
    });
  }
}
