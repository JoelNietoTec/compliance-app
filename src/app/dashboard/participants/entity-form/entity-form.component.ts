import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Participant, ParticipantType } from '../../../shared/models/participants.model';
import { Gender } from '../../../shared/models/genders.model';
import { ParticipantsService } from '../../../shared/services/participants.service';

interface Entity extends Participant {
  formBirthDate?: NgbDateStruct;
}

const NOW = new Date();

@Component({
  selector: 'entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})

export class EntityFormComponent implements OnInit {

  @Input() entity?: Entity;

  _entity: Entity;
  private birthdate: string;
  _default: any = undefined;
  _maxDate: any;
  _minDate: any;

  constructor(
    private _partServ: ParticipantsService,
    private _dateFormatter: NgbDateParserFormatter,
    private toastr: ToastsManager,
    private _router: Router
  ) {
    this._maxDate = {
      year: NOW.getFullYear() + 1,
      month: 1
    };

    this._minDate = {
      year: NOW.getFullYear() - 100,
      month: 1
    };
  }

  ngOnInit() {
    if (!this.entity) {
      this._entity = {
        ParticipantTypeID: 2,
        GenderID: 1
      };
    } else {
      this._entity = this.entity;
      this._entity.formBirthDate = this._dateFormatter.parse(this._entity.BirthDate.toString());
    }
  }

  saveEntity() {
    this._entity.BirthDate = new Date(this._dateFormatter.format(this._entity.formBirthDate));
    if (!this.entity) {
      this._partServ.createParticipant(this._entity)
        .subscribe(data => {
          this.toastr.info(`ID: ${data.ID}`, 'Entity Created');
          this._router.navigate(['/Dashboard/Participants', data.ID]);
        });
    } else {
      this._partServ.updateParticipant(this._entity.ID, this._entity)
        .subscribe(data => {
          this.toastr.info(`ID: ${this._entity.ID}`, 'Entity Updated');
          this._router.navigate(['/Dashboard/Participants', this._entity.ID]);
        });
    }
  }
}
