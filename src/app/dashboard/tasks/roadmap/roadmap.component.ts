import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbDateParserFormatter, NgbDateStruct, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/services/util.service';
import { RoadmapService } from '../../../shared/services/roadmap.service';
import { Roadmap } from '../../../shared/models/roadmap.model';
import { ToastsManager } from 'ng2-toastr';
import { RoadmapsFormComponent } from '../roadmaps-form/roadmaps-form.component';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {
  @ViewChild(RoadmapsFormComponent) private form: RoadmapsFormComponent;

  _roadMaps: Roadmap[];
  _newRoadmap: Roadmap;
  _selectedRoadmap: Roadmap = {};
  _currentRoadMap: Roadmap;
  _startDate: NgbDateStruct;
  _endDate: NgbDateStruct;
  closeResult: string;
  _default: undefined;

  constructor(
    private _util: UtilService,
    private _roadmapServ: RoadmapService,
    private modal: NgbModal,
    private dateFormatter: NgbDateParserFormatter,
    private toast: ToastsManager,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this._roadmapServ.getRoadmaps().subscribe(data => {
      this._roadMaps = data;
    });
  }

  open() {
    const modalRef = this.modal.open(RoadmapsFormComponent);
    modalRef.result.then(
      result => {
        this.save();
      },
      dismiss => {
        this._selectedRoadmap = {};
      }
    );
    modalRef.componentInstance.currentRoadmap = this._selectedRoadmap;
  }

  save() {
    if (!this._selectedRoadmap.ID) {
      this.createRoadmap();
    }
  }
  selectRoadmap() {
    this._selectedRoadmap = Object.assign({}, this._selectedRoadmap, this._currentRoadMap);
    this.open();
  }

  createRoadmap() {
    this._roadmapServ.createRoadmap(this._selectedRoadmap).subscribe(data => {
      this._roadMaps.push(data);
      this.toast.success('Cronograma creado exitosamente!');
    });
  }

  updateRoadmap() {
    this._roadmapServ.updateRoadmap(this._selectedRoadmap.ID, this._selectedRoadmap).subscribe(data => {
      this._currentRoadMap = this._selectedRoadmap;
      this.toast.success('Cronograma editado exitosamente!');
    });
  }
}
