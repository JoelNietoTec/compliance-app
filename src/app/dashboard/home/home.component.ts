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
  public byRisk: any[];

  public pieChartLabels: Array<string> = []; // ['High', 'Medium', 'Low', 'Incomplete'];
  public pieChartData: Array<number> = []; // = [200, 600, 400, 300];
  public pieChartType: string = 'doughnut';
  public pieChartOptions: any;
  public chartColors: Array<any>;
  public chartReady: Boolean = false;
  public _addresses: Array<any> = [];

  constructor(private _partServ: ParticipantsService, private _util: UtilService, private _map: MapsService) {
    this._partServ.getParticipants().subscribe(participants => {
      participants.forEach(part => {
        let location = {};
        this._map.getPosition(part.Address).subscribe(position => {
          if (position.results[0]) {
            location = position.results[0];
            this._addresses.push(location);
          }
        });
      });
    });
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
      this.loadChart();
    });
  }

  ngOnInit() {}

  loadChart() {
    const labels: string[] = [];
    const data: number[] = [];
    for (const i of this.byRisk) {
      labels.push(i.Rate);
      data.push(i.Count);
    }

    this.pieChartData = data;
    this.pieChartLabels = labels;

    this.pieChartOptions = {
      title: {
        display: true,
        text: 'Distribución de Riesgo',
        fontFamily: 'Poppins',
        fontSize: 16
      },
      legend: {
        position: 'bottom',
        labels: {
          fontFamily: 'Poppins',
          boxWidth: 20
        }
      },
      tooltips: {
        bodyFontFamily: 'Poppins',
        bodyFontSize: 14
      }
    };
    this.chartColors = [
      {
        backgroundColor: ['#db7b7b', '#f8cd79', '#639a6f', '#b2b2b2']
      }
    ];
    this.chartReady = true;
  }
}
