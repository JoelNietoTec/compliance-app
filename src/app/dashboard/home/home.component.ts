import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from '../../shared/services/participants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public byRisk: any[];

  public pieChartLabels: Array<string> = []; // ['High', 'Medium', 'Low', 'Incomplete'];
  public pieChartData: Array<number> = []; // = [200, 600, 400, 300];
  public pieChartType: string = 'pie';
  public pieChartOptions: any;
  public chartColors: Array<any>;
  public chartReady: Boolean = false;

  constructor(
    private _partServ: ParticipantsService
  ) {
    this._partServ.getParticipantsbyRisk()
      .subscribe(data => {
        this.byRisk = data;
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
        fontFamily: 'Nunito',
        fontSize: 16
      },
      legend: {
        position: 'right',
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
    this.chartColors = [
      {
        backgroundColor: ['#b2b2b2', '#639a6f', '#f8cd79', '#db7b7b']
      }
    ];
    this.chartReady = true;
  };
}
