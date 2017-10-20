import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CountriesService } from '../../../shared/services/countries.service';
import { Country } from '../../../shared/models/country.model';
import { TableOptions, Column } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  _columns: Array<Column>;
  _options: TableOptions = {};
  _countries: Array<Country>;

  constructor(private _countryServ: CountriesService, private toastr: ToastsManager) {}

  ngOnInit() {
    this._options.columns = [
      { name: 'Name', title: 'Nombre', type: 'text', filterable: true },
      { name: 'EnglishName', title: 'Nombre Inglés', type: 'text', filterable: true },
      { name: 'Abbreviation', title: 'Código', type: 'text', filterable: true }
    ];

    this._options.title = 'Países';

    this._options.style = 'table table-sm table-squared';

    this._options.pageable = true;

    this._countryServ.getCountries().subscribe(data => {
      this._countries = data;
    });
  }

  addCountry(country: Country) {
    return this._countryServ.addCountry(country).subscribe(data => {
      this.toastr.success(data.Name, 'País añadido');
      this._countries.push(data);
    });
  }
}
