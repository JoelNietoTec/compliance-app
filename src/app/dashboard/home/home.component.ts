import { Component, OnInit } from '@angular/core';

import { ParticipantsService } from '../../shared/services/participants.service';
import { TasksService } from '../../shared/services/tasks.service';
import { MapsService } from '../../shared/services/maps.service';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public byRisk: any[];
  public byCountry: any[];
  public _countries: any;

  public riskChartOptions: any;
  public countryChartOptions: any;
  public tasksChartOptions: any;
  public _tasks: any[];
  public _partTasks: any[];
  public riskColors: any[];
  public chartReady: Boolean = false;

  constructor(
    private _partServ: ParticipantsService,
    private _util: UtilService,
    private _map: MapsService,
    private _taskService: TasksService
  ) {}

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
      console.log(this.byRisk);
      this.loadRiskChart();
    });
    this.loadCountry();
    this.loadTasks();
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

  loadTasks() {
    this.tasksChartOptions = {
      title: {
        display: true,
        text: 'Tareas Diarias',
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

    this._taskService.getTaskCount(1).subscribe(data => {
      this._tasks = data;
    });

    this._taskService.getTaskCount(2).subscribe(data => {
      this._partTasks = data;
    });
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
