import { Component, OnInit, Input } from '@angular/core';
import { Roadmap } from '../../../shared/models/roadmap.model';
import { NgbDateParserFormatter, NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RoadmapService } from '../../../shared/services/roadmap.service';

@Component({
  selector: 'roadmaps-form',
  templateUrl: './roadmaps-form.component.html',
  styleUrls: ['./roadmaps-form.component.css']
})
export class RoadmapsFormComponent implements OnInit {
  @Input() currentRoadmap: Roadmap;

  _endDate: NgbDateStruct;
  _startDate: NgbDateStruct;

  constructor(
    private _dateFormatter: NgbDateParserFormatter,
    private _roadmapService: RoadmapService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    if (this.currentRoadmap.StartDate) {
      this._startDate = this._dateFormatter.parse(this.currentRoadmap.StartDate.toString());
    }
    if (this.currentRoadmap.EndDate) {
      this._endDate = this._dateFormatter.parse(this.currentRoadmap.EndDate.toString());
    }
  }

  updateDates() {
    this.currentRoadmap.StartDate = new Date(this._dateFormatter.format(this._startDate));
    this.currentRoadmap.EndDate = new Date(this._dateFormatter.format(this._endDate));
  }
}
