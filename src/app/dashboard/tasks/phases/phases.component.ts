import { Component, OnInit, Input } from '@angular/core';
import { Roadmap, Phase } from '../../../shared/models/roadmap.model';
import { UtilService } from '../../../shared/services/util.service';
import { RoadmapService } from '../../../shared/services/roadmap.service';
import { NgbModal, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.css']
})
export class PhasesComponent implements OnInit {
  @Input() roadmap: Roadmap;
  _startDate: NgbDateStruct;
  _endDate: NgbDateStruct;

  _newPhase: Phase = {};

  constructor(
    private _util: UtilService,
    private roadmapServ: RoadmapService,
    private modal: NgbModal,
    private dateFormatter: NgbDateParserFormatter,
    private toast: ToastsManager
  ) {}

  ngOnInit() {
  }

  createPhase() {
    this._newPhase.StartDate = new Date(this.dateFormatter.format(this._startDate));
    this._newPhase.EndDate = new Date(this.dateFormatter.format(this._endDate));
    this.roadmapServ.createPhase(this._newPhase).subscribe(data => {
      this.roadmap.Phases.push(data);
      this.toast.success('Fase creada exitosamente');
      this._newPhase = {};
    });
  }

  open(content) {
    this._newPhase.RoadmapID = this.roadmap.ID;
    console.log(this._newPhase);
    this.modal.open(content).result.then(
      result => {
        this.createPhase();
      },
      reason => {}
    );
  }
}
