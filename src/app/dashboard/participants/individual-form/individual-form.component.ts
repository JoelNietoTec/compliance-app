import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { Participant, ParticipantType } from '../../../shared/models/participants.model';
import { Gender } from '../../../shared/models/genders.model';
import { Country } from '../../../shared/models/country.model';
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
  _individual: Individual;
  private birthdate: string;
  _genders: Array<Gender>;
  _default: any = undefined;
  _startDate: any;
  _maxDate: any;
  _minDate: any;
  _countries: Array<Country> = JSON.parse(localStorage.getItem('countries'));
  _nationalities: Array<IMultiSelectOption> = [];

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'form-control',
    containerClasses: 'select-container',
    itemClasses: 'select-item'
  };

  constructor(
    private _partServ: ParticipantsService,
    private _dateFormatter: NgbDateParserFormatter,
    private _util: UtilService,
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
    if (!this.individual) {
      this._individual = {
        ParticipantTypeID: 1
      };
    } else {
      this._individual = this.individual;
      this._individual.formBirthDate = this._dateFormatter.parse(this._individual.BirthDate.toString());
      console.log(this._individual);
    }

    this._countries.forEach(country => {
      let item: IMultiSelectOption;
      item = {
        id: country.ID,
        name: this._util.capitalize(country.EnglishName)
      };
      this._nationalities.push(item);
    });

  }

  saveIndividual() {
    this._individual.BirthDate = new Date(this._dateFormatter.format(this._individual.formBirthDate));
    if (!this.individual) {
      this._partServ.createParticipant(this._individual)
        .subscribe(data => {
          this._router.navigate(['Dashboard/Participants', data.ID]);
        });
    } else {
      console.log('This');
      this._partServ.updateParticipant(this._individual.ID, this._individual)
        .subscribe(data => {
          this._router.navigate(['Dashboard/Participants', this._individual.ID]);
        });
    }


  }
}
