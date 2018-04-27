import { Component, OnInit, Input } from '@angular/core';
import { Phase } from '../../../shared/models/roadmap.model';
import { NgbDateStruct, NgbDateParserFormatter, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoadmapService } from '../../../shared/services/roadmap.service';

@Component({
  selector: 'app-phases-form',
  templateUrl: './phases-form.component.html',
  styleUrls: ['./phases-form.component.css']
})
export class PhasesFormComponent implements OnInit {
  @Input() currentPhase: Phase;

  _startDate: NgbDateStruct;
  _endDate: NgbDateStruct;

  constructor(private _dateFormatter: NgbDateParserFormatter, _roadmapServ: RoadmapService, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    console.log(this.currentPhase);
    if (this.currentPhase.StartDate) {
      this._startDate = this._dateFormatter.parse(this.currentPhase.StartDate.toString());
    }
    if (this.currentPhase.EndDate) {
      this._endDate = this._dateFormatter.parse(this.currentPhase.EndDate.toString());
    }
  }

  updateDates() {
    this.currentPhase.StartDate = new Date(this._dateFormatter.format(this._startDate));
    this.currentPhase.EndDate = new Date(this._dateFormatter.format(this._endDate));
  }
}
