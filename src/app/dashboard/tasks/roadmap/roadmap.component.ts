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
  _newRoadmap: Roadmap = {};
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

  // open(content) {
  //   this.modal.open(content).result.then(
  //     result => {
  //       this.createRoadmap();
  //       this.closeResult = `Close with: ${result}`;
  //     },
  //     reason => {
  //       console.log(`Dismissed ${this.getDismissReason(reason)}`);
  //     }
  //   );
  // }

  open() {
    const modalRef = this.modal.open(RoadmapsFormComponent);
    modalRef.result.then(
      result => {
        this.createRoadmap();
      },
      dismiss => {
        this._currentRoadMap = {};
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  createRoadmap() {
    this._newRoadmap.StartDate = new Date(this.dateFormatter.format(this._startDate));
    this._newRoadmap.EndDate = new Date(this.dateFormatter.format(this._endDate));
    this._roadmapServ.createRoadmap(this._newRoadmap).subscribe(data => {
      this._roadMaps.push(data);
      this.toast.success('Cronograma creado exitosamente');
    });
  }
}
