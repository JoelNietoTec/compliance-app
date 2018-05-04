import { Component, OnInit, Input } from '@angular/core';
import { Phase, Milestone, Recurrence } from '../../../shared/models/roadmap.model';
import { UtilService } from '../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';
import { RoadmapService } from '../../../shared/services/roadmap.service';
import { NgbModal, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TableOptions } from '../../../shared/components/custom-table/custom-table.options';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {
  @Input() phase: Phase;

  _newMilestone: Milestone = {};
  _table: TableOptions = {};
  _recurrence: Recurrence[];
  _startDate: NgbDateStruct;
  _endDate: NgbDateStruct;

  constructor(
    private _util: UtilService,
    private toast: ToastrService,
    private roadmapServ: RoadmapService,
    private modal: NgbModal,
    private dateFormatter: NgbDateParserFormatter
  ) {
    this._table.editable = true;
    this._table.style = 'table-sm';
    this._table.columns = [
      { name: 'ID', hidden: true },
      { name: 'Title', title: 'Nombre', sortable: true },
      { name: 'Description', title: 'Descripción', sortable: true },
      { name: 'StartDate', title: 'Fecha Inicio', type: 'date', sortable: true },
      { name: 'EndDate', title: 'Fecha Final', type: 'date', sortable: true },
      { name: 'Completion', title: 'Avance', type: 'number', sortable: true }
    ];
  }

  ngOnInit() {
    this.roadmapServ.getRecurrence().subscribe(data => {
      this._recurrence = data;
    });
  }

  createMilestone() {
    this._newMilestone.PhaseID = this.phase.ID;
    this._newMilestone.StartDate = new Date(this.dateFormatter.format(this._startDate));
    this._newMilestone.EndDate = new Date(this.dateFormatter.format(this._endDate));
    this.roadmapServ.createMilestone(this._newMilestone).subscribe(data => {
      this.phase.Milestones.push(data);
    });
  }

  open(content) {
    this.modal.open(content).result.then(
      result => {
        this.createMilestone();
        this.toast.success('Tarea creada exitosamente');
        this._newMilestone = {};
      },
      reason => {}
    );
  }
}
