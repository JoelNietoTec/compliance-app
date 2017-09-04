import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from '../../shared/services/participants.service';

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

  constructor(
    private _partServ: ParticipantsService,
    private _util: UtilService
  ) {
    this._partServ.getParticipantsbyRisk()
      .subscribe(data => {
        this.byRisk = data;
        for (let i of this.byRisk) {
          if (i.Rate === 'Incomplete') {
            i.name = 'Incomplete';
          } else {
            i.name = i.Rate + ' Risk Participants';
          }
        }
        this.byRisk = this._util.sortBy(this.byRisk, 'Sort', true);
        console.log(this.byRisk);
        this.loadChart();
      });
  }

  ngOnInit() {
  }

  loadChart() {
    let labels: string[] = [];
    let data: number[] = [];
    for (let i of this.byRisk) {
      labels.push(i.Rate);
      data.push(i.Count);
    }

    this.pieChartData = data;
    this.pieChartLabels = labels;

    this.pieChartOptions = {
      title: {
        display: true,
        text: 'Risk Distribution',
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
  };
}
