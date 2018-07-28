import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  OnDestroy
} from '@angular/core';
import { Segment } from '../../models/participants.model';
import { ParticipantsService } from '../../services/participants.service';
import { ParamsService } from '../../services/params.service';
import { Param } from '../../models/params.model';

@Component({
  selector: 'app-segment-chart',
  templateUrl: './segment-chart.component.html',
  styleUrls: ['./segment-chart.component.css']
})
export class SegmentChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() paramId: number;

  _segments: Segment[];
  _labels: string[];
  _values: number[];
  _param: Param;
  _options: any;
  _ready: Boolean = false;
  _chartData: any;

  constructor(
    private _participantServ: ParticipantsService,
    private _paramServ: ParamsService
  ) {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // tslint:disable-next-line:forin
    for (const propName in changes) {
      this.ngOnDestroy();
      if (propName === 'paramId') {
        this.initChart();
      }
    }
  }

  ngOnDestroy() {}

  initChart() {
    this._paramServ.getParam(this.paramId).subscribe(data => {
      this._param = data;
    });
    this.loadOptions();

    this._participantServ.getSegments(this.paramId).subscribe(data => {
      this._segments = data;

      this._labels = this._segments.map(label => label.valueName);
      this._values = this._segments.map(value => value.count);
      const chartData = {
        labels: this._labels,
        datasets: [
          {
            label: 'Segmento',
            data: this._values,
            backgroundColor: [
              'rgb(255, 99, 132, 0.6)',
              'rgb(54, 162, 235, 0.6)',
              'rgb(255, 206, 86, 0.6)',
              'rgb(231, 233, 23, 0.6)',
              'rgb(75, 192, 192, 0.6)',
              'rgb(151, 187, 205, 0.6)',
              'rgb(220, 220, 22, 0.6)',
              'rgb(247, 70, 74, 0.6)',
              'rgb(70, 191, 189, 02)',
              'rgb(253, 180, 92, 0.6)',
              'rgb(148, 159, 177, 0.6)',
              'rgb(77, 83, 96, 0.6)'
            ]
          }
        ]
      };

      this._chartData = chartData;
      this._ready = true;
    });
  }

  ngOnInit() {}

  loadOptions() {
    this._options = {
      title: {
        display: false,
        text: 'Participantes',
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
      tooltips: { bodyFontFamily: 'Quicksand', bodyFontSize: 12 }
    };
  }
}
