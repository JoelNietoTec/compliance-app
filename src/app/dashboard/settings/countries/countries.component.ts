import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CountriesService } from '../../../shared/services/countries.service';
import { Country } from '../../../shared/models/country.model';
import { TableOptions, Column } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  _options: TableOptions = {};
  _countries = this._countryServ.getCountries();

  constructor(private _countryServ: CountriesService, private toastr: ToastrService) {}

  ngOnInit() {
    this._options.columns = [
      { name: 'name', title: 'Nombre', type: 'text', filterable: true },
      { name: 'englishName', title: 'Nombre Inglés', type: 'text', filterable: true },
      { name: 'abbreviation', title: 'Código', type: 'text', filterable: true },
      { name: 'blackList', title: 'Lista Negra', type: 'boolean' }
    ];

    this._options.style = 'table table-sm table-squared';

    this._options.pageable = true;

    this._options.title = 'Países';

    this._options.searcheable = true;

    this._options.exportToCSV = true;

    this._options.editable = true;

    this._options.addMethod = 'inline';

  }

  addCountry(country: Country) {
    return this._countryServ.addCountry(country).subscribe(data => {
      this.toastr.success(data.name, 'País añadido');
      this._countries = this._countryServ.getCountries();
    });
  }

  updateCountry(country: Country) {
    this._countryServ.editCountry(country.id, country).subscribe(data => {
      this.toastr.success(country.name, 'País editado');
      this._countries = this._countryServ.getCountries();
    });
  }
}
