import { Component, OnInit, Input } from '@angular/core';
import { Segment } from '../../models/participants.model';
import { ParticipantsService } from '../../services/participants.service';
import { ParamsService } from '../../services/params.service';
import { Param } from '../../models/params.model';

@Component({
  selector: 'app-segment-chart',
  templateUrl: './segment-chart.component.html',
  styleUrls: ['./segment-chart.component.css']
})
export class SegmentChartComponent implements OnInit {
  @Input() paramId: number;

  _segments: Segment[];
  _labels: string[];
  _values: number[];
  _param: Param;
  _options: any;
  _ready: Boolean = false;

  constructor(
    private _participantServ: ParticipantsService,
    private _paramServ: ParamsService
  ) {}

  ngOnInit() {
    this._paramServ.getParam(this.paramId).subscribe(data => {
      this._param = data;
    });
    this.loadOptions();
    this._labels = [];
    this._values = [];

    this._participantServ.getSegments(this.paramId).subscribe(data => {
      this._segments = data;
      this._segments.forEach(segment => {
        this._labels.push(segment.valueName);
        this._values.push(segment.count);
      });
      console.log(this._labels);
      console.log(this._values);
      this._ready = true;
    });
  }

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
