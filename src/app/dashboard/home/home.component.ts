import { Component, OnInit } from '@angular/core';

import { ParticipantsService } from '../../shared/services/participants.service';
import { MapsService } from '../../shared/services/maps.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public byRisk: Array<any>;
  public byCountry: Array<any>;
  public _countries: any;

  public riskChartOptions: any;
  public countryChartOptions: any;
  public riskColors: Array<any>;
  public chartReady: Boolean = false;

  constructor(private _partServ: ParticipantsService, private _util: UtilService, private _map: MapsService) {}

  ngOnInit() {
    this._partServ.getParticipantsbyRisk().subscribe(data => {
      this.byRisk = data;
      for (const i of this.byRisk) {
        if (i.Rate === 'No disponible') {
          i.name = 'No disponible';
        } else {
          i.name = `${i.Rate} Riesgo`;
        }
      }
      this.byRisk = this._util.sortBy(this.byRisk, 'Sort', true);
      this.loadRiskChart();
    });
    this.loadCountry();
  }

  loadRiskChart() {
    this.riskChartOptions = {
      title: {
        display: true,
        text: 'Distribución de Riesgo',
        fontFamily: 'Nunito',
        fontSize: 16
      },
      legend: {
        position: 'left',
        labels: {
          fontFamily: 'Nunito',
          boxWidth: 20
        }
      },
      tooltips: {
        bodyFontFamily: 'Nunito',
        bodyFontSize: 14
      }
    };
    this.riskColors = [
      {
        backgroundColor: ['#db7b7b', '#f8cd79', '#639a6f', '#b2b2b2']
      }
    ];
  }

  loadCountry() {
    this.countryChartOptions = {
      title: {
        display: true,
        text: 'Participantes por País',
        fontFamily: 'Nunito',
        fontSize: 16
      },
      legend: {
        position: 'left',
        labels: {
          fontFamily: 'Nunito',
          boxWidth: 20
        }
      },
      tooltips: {
        bodyFontFamily: 'Nunito',
        bodyFontSize: 14
      }
    };
    this._partServ.getParticipantsbyCountry().subscribe(data => {
      this.byCountry = data;
      this._countries = {};
      this.byCountry.forEach(country => {
        this._countries[country.Abbreviation] = country.Value;
      });
    });
  }
}
