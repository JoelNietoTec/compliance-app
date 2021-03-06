import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Roadmap, Phase } from '../../../shared/models/roadmap.model';
import { UtilService } from '../../../shared/services/util.service';
import { RoadmapService } from '../../../shared/services/roadmap.service';
import { NgbModal, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PhasesFormComponent } from '../phases-form/phases-form.component';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.css']
})
export class PhasesComponent implements OnInit {
  @Input() roadmap: Roadmap;
  @ViewChild(PhasesFormComponent) private form: PhasesFormComponent;

  _startDate: NgbDateStruct;
  _endDate: NgbDateStruct;

  _newPhase: Phase = {};
  _currentPhase: Phase = {};

  constructor(
    private _util: UtilService,
    private roadmapServ: RoadmapService,
    private modal: NgbModal,
    private dateFormatter: NgbDateParserFormatter,
    private toast: ToastrService
  ) {}

  ngOnInit() {}

  createPhase() {
    this._newPhase = this._currentPhase;
    console.log(this._newPhase);
    this.roadmapServ.createPhase(this._newPhase).subscribe(data => {
      this.roadmap.Phases.push(data);
      this.toast.success('Fase creada exitosamente');
      this._newPhase = {};
    });
  }

  updatePhase() {
    this.roadmapServ.updatePhase(this._currentPhase.ID, this._currentPhase).subscribe(data => {
      this.toast.success('Fase editada exitosamente');
    });
  }

  open() {
    const modalRef = this.modal.open(PhasesFormComponent);
    modalRef.result.then(
      result => {
        this.save();
      },
      dismiss => {
        this._currentPhase = {};
      }
    );
    modalRef.componentInstance.currentPhase = this._currentPhase;
  }

  selectPhase(phase: Phase) {
    this._currentPhase = Object.assign({}, this._currentPhase, phase);
    this.open();
  }

  save() {
    if (!this._currentPhase.ID) {
      this.createPhase();
      this._currentPhase = {};
    } else {
      this.updatePhase();
    }
  }
}
