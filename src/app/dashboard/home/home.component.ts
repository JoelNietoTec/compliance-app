import { Component, OnInit } from '@angular/core';

import { ParticipantsService } from '../../shared/services/participants.service';
import { TasksService } from '../../shared/services/tasks.service';
import { MapsService } from '../../shared/services/maps.service';
import { UtilService } from '../../shared/services/util.service';
import { Participant } from '../../shared/models/participants.model';

interface Part extends Participant {
  location?: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public byRisk: any[];
  public byCountry: any[];
  public byType: any[];
  public _countries: any;
  public _lastParticipants: Participant[];
  public _participants: Part[];
  public _mapReady: boolean;

  public riskChartOptions: any;
  public countryChartOptions: any;
  public tasksChartOptions: any;
  public _tasks: any[];
  public _partTasks: any[];
  public riskColors: any[];
  public chartReady: Boolean = false;
  public _addresses: any[];

  constructor(
    private _partServ: ParticipantsService,
    private _util: UtilService,
    private _map: MapsService,
    private _taskService: TasksService
  ) {
    _partServ.getParticipants().subscribe(participants => {
      this._addresses = [];
      this._participants = participants;
      this.byType = (_util.mapCountItems(this._participants, 'type.name'));
      this._participants.forEach(part => {
        let location: any = {};
        _map.getPosition(part.address).subscribe(position => {
          if (position.results[0]) {
            location = position.results[0];
            location.participant = part;
            this._addresses.push(location);
            part.location = location;
          }
        });
      });
    });
  }

  ngOnInit() {
    this._partServ.getParticipantsbyRisk().subscribe(data => {
      console.log(data);
      this.byRisk = data;
      for (const i of this.byRisk) {
        if (i.rate === 'No disponible') {
          i.name = 'No disponible';
        } else {
          i.name = `${i.rate} Riesgo`;
        }
      }
      this.byRisk = this._util.sortBy(this.byRisk, 'sort', true);
      this.loadRiskChart();
    });
    this.loadCountry();
    this.loadTasks();
    this.loadLastParticipants();
  }

  loadRiskChart() {
    this.riskChartOptions = {
      title: {
        display: false,
        text: 'Distribución de Riesgo',
        fontFamily: 'Quicksand',
        fontSize: 12
      },
      legend: {
        position: 'left',
        labels: {
          fontFamily: 'Quicksand',
          boxWidth: 15,
          fontSize: 12,
          fontStyle: 'bold'
        }
      },
      tooltips: {
        bodyFontFamily: 'Quicksand',
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
        display: false,
        text: 'Tareas Diarias',
        fontFamily: 'Quicksand',
        fontSize: 14
      },
      legend: {
        position: 'left',
        labels: {
          fontFamily: 'Quicksand',
          boxWidth: 15,
          fontSize: 12,
          fontStyle: 'bold'
        }
      },
      tooltips: {
        bodyFontFamily: 'Quicksand',
        bodyFontSize: 12
      }
    };

    // this._taskService.getTaskCount(1).subscribe(data => {
    //   this._tasks = data;
    // });

    // this._taskService.getTaskCount(2).subscribe(data => {
    //   this._partTasks = data;
    // });
  }

  loadCountry() {
    this.countryChartOptions = {
      title: { display: true, text: 'Participantes por País', fontFamily: 'Quicksand', fontSize: 16 },
      legend: { position: 'left', labels: { fontFamily: 'Quicksand', boxWidth: 20, fontStyle: 'bold' } },
      tooltips: { bodyFontFamily: 'Quicksand', bodyFontSize: 14 }
    };
    this._partServ.getParticipantsbyCountry().subscribe(data => {
      this.byCountry = data;
      this._countries = {};
      this.byCountry.forEach(country => {
        this._countries[country.abbreviation.toLowerCase()] = country.value;
      });
    });
  }

  loadLastParticipants() {
    this._partServ.getLastParticipants().subscribe(data => {
      this._lastParticipants = data;
    });
  }
}
