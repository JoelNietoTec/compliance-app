import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Participant, ParticipantType } from '../../../shared/models/participants.model';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';
import { MapsService } from '../../../shared/services/maps.service';
import { CountriesService } from '../../../shared/services/countries.service';
import { Country } from '../../../shared/models/country.model';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';
import { ParamMatrix } from '../../../shared/models/params.model';

const NOW = new Date();

@Component({
  selector: 'entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  @Input() entity?: Participant;
  @Output() updateParticipant = new EventEmitter();

  _countries: Country[];
  _matrices: Observable<ParamMatrix[]>;
  _entity: Participant;
  _location: any;
  _default: any = undefined;
  _maxDate: any;
  _minDate: any;

  constructor(
    private _partServ: ParticipantsService,
    private _countryServ: CountriesService,
    private _matrixServ: ParamMatricesService,
    private toastr: ToastrService,
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

    this._matrices = this._matrixServ.getMatrices();
    if (!this.entity) {
      this._entity = {
        participantTypeId: 2,
        genderId: 1
      };
    } else {
      this._entity = this.entity;
      this.setLocation();
    }
  }

  setLocation() {
    this._map.getPosition(this._entity.address).subscribe(position => {
      this._location = position.results[0].geometry.location;
    });
  }

  saveEntity() {
    if (!this.entity) {
      this._entity.createDate = new Date();
      this._partServ.createParticipant(this._entity).subscribe(data => {
        this.toastr.success(data.shortName, 'Entidad creada');
        this._router.navigate(['app/participantes', data.id]);
      });
    } else {
      this._entity.country = this._util.filterByID(this._countries, this._entity.countryId);
      this._partServ.updateParticipant(this._entity.id, this._entity).subscribe(data => {
        this.toastr.success(data.shortName, 'Entidad actualizada');
        this.updateParticipant.emit();
      });
    }
  }
}
