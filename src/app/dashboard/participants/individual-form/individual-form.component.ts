import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Participant, ParticipantType } from '../../../shared/models/participants.model';
import { Gender } from '../../../shared/models/genders.model';
import { Country } from '../../../shared/models/country.model';
import { MapsService } from '../../../shared/services/maps.service';
import { CountriesService } from '../../../shared/services/countries.service';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';

interface Individual extends Participant {
  formBirthDate?: NgbDateStruct;
}

const NOW = new Date();

@Component({
  selector: 'individual-form',
  templateUrl: './individual-form.component.html',
  styleUrls: ['./individual-form.component.css']
})
export class IndividualFormComponent implements OnInit {
  @Input() individual?: Individual;
  @Output() updateParticipant = new EventEmitter();

  _individual: Individual;
  private birthdate: string;
  _genders: Gender[];
  _default: any = undefined;
  _startDate: any;
  _maxDate: any;
  _minDate: any;
  _countries: Country[];
  _location: any;

  // mySettings: IMultiSelectSettings = {
  //   enableSearch: true,
  //   checkedStyle: 'fontawesome',
  //   buttonClasses: 'form-control',
  //   containerClasses: 'select-container',
  //   itemClasses: 'select-item'
  // };

  constructor(
    private _partServ: ParticipantsService,
    private _dateFormatter: NgbDateParserFormatter,
    private _util: UtilService,
    private _countryServ: CountriesService,
    private _map: MapsService,
    private toastr: ToastsManager,
    private _router: Router
  ) {
    this._genders = [
      {
        ID: 1,
        Name: 'Femenino',
        EnglishName: 'Female'
      },
      {
        ID: 2,
        Name: 'Masculino',
        EnglishName: 'Male'
      }
    ];

    this._startDate = {
      year: NOW.getFullYear() - 18,
      month: 1
    };

    this._maxDate = {
      year: NOW.getFullYear() - 10,
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
    if (!this.individual) {
      this._individual = {
        ParticipantTypeID: 1
        // Nationalities: []
      };
    } else {
      this._individual = this.individual;
      this._individual.formBirthDate = this._dateFormatter.parse(this._individual.BirthDate.toString());
      this.setLocation();
    }

    // this._countries.forEach(country => {
    //   let item: IMultiSelectOption;
    //   item = {
    //     id: country.ID,
    //     name: this._util.capitalize(country.Name)
    //   };
    //   this._nationalities.push(item);
    // });
  }

  // setNationalities() {
  //   if (this._individual.Nationalities) {
  //     console.log('this');
  //     this._selCountries.forEach(c => {
  //       const country = this._util.filterByID(this._countries, c);
  //       this._individual.Nationalities.push(country);
  //     });
  //   }
  // }

  setLocation() {
    this._map.getPosition(this._individual.Address).subscribe(position => {
      this._location = position.results[0].geometry.location;
    });
  }
  saveIndividual() {
    this._individual.BirthDate = new Date(this._dateFormatter.format(this._individual.formBirthDate));
    if (!this.individual) {
      this._individual.CreateDate = new Date();
      this._partServ.createParticipant(this._individual).subscribe(data => {
        this.toastr.success(data.ShortName, 'Individuo Creado');
        this._router.navigate(['app/participantes', data.ID]);
      });
    } else {
      this._individual.Country = this._util.filterByID(this._countries, this._individual.CountryID);
      this._partServ.updateParticipant(this._individual.ID, this._individual).subscribe(data => {
        this.toastr.success(data.ShortName, 'Individuo Actualizado');
        this.updateParticipant.emit();
      });
    }
  }
}
