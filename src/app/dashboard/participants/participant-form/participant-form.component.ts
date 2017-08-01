import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Participant, ParticipantType } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { GendersService } from '../../../shared/services/genders.service';
import { Gender } from '../../../shared/models/genders.model';

@Component({
  selector: 'participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.css']
})
export class ParticipantFormComponent implements OnInit {

  _types: ParticipantType[];
  _type: ParticipantType;
  _default: any = undefined;

  constructor(
    private _gendersService: GendersService,
    private _partServ: ParticipantsService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._types = [
      {
        ID: 1,
        EnglishName: 'Individual',
        Name: 'Individuo'
      },
      {
        ID: 2,
        EnglishName: 'Entity',
        Name: 'Entidad'
      }
    ];
  }

  ngOnInit() {

  };

};
