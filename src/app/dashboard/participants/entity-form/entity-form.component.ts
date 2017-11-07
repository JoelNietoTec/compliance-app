import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Participant, ParticipantType } from '../../../shared/models/participants.model';
import { Gender } from '../../../shared/models/genders.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';
import { MapsService } from '../../../shared/services/maps.service';
import { CountriesService } from '../../../shared/services/countries.service';
import { Country } from '../../../shared/models/country.model';

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
  @Output() updateParticipant = new EventEmitter();

  _countries: Array<Country>;
  _entity: Entity;
  _location: any;
  private birthdate: string;
  _default: any = undefined;
  _maxDate: any;
  _minDate: any;

  constructor(
    private _partServ: ParticipantsService,
    private _countryServ: CountriesService,
    private _dateFormatter: NgbDateParserFormatter,
    private toastr: ToastsManager,
    private _util: UtilService,
    private _map: MapsService,
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
    this._countryServ.getCountries().subscribe(data => {
      this._countries = this._util.sortBy(data, 'Name');
    });
    if (!this.entity) {
      this._entity = {
        ParticipantTypeID: 2,
        GenderID: 1
      };
    } else {
      this._entity = this.entity;
      this._entity.formBirthDate = this._dateFormatter.parse(this._entity.BirthDate.toString());
      this.setLocation();
    }
  }

  setLocation() {
    this._map.getPosition(this._entity.Address).subscribe(position => {
      this._location = position.results[0].geometry.location;
    });
  }

  saveEntity() {
    this._entity.BirthDate = new Date(this._dateFormatter.format(this._entity.formBirthDate));
    if (!this.entity) {
      this._partServ.createParticipant(this._entity).subscribe(data => {
        this.toastr.success(data.ShortName, 'Entidad creada');
        this._router.navigate(['/dashboard/participants', data.ID]);
      });
    } else {
      this._entity.Country = this._util.filterByID(this._countries, this._entity.CountryID);
      this._partServ.updateParticipant(this._entity.ID, this._entity).subscribe(data => {
        this.toastr.success(data.ShortName, 'Entidad actualizada');
        this.updateParticipant.emit();
      });
    }
  }
}
