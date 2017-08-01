import { Component, OnInit, Input } from '@angular/core';

import { ParamTable, ParamMatrix } from '../../../shared/models/params.model';
import { Participant } from '../../../shared/models/participants.model';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'participant-compliance',
  templateUrl: './participant-compliance.component.html',
  styleUrls: ['./participant-compliance.component.css']
})

export class ParticipantComplianceComponent implements OnInit {
  @Input() participant: Participant;

  _matrix: ParamMatrix;
  _matrices: ParamMatrix[];

  constructor(
    private _matrixService: ParamMatricesService,
    private _util: UtilService
  ) { }

  ngOnInit() {
    this._matrixService.getMatrix(this.participant.ParamMatrixID)
      .subscribe(data => {
        this._matrix = data;
        this._matrix.ParamCategories = this._util.sortBy(this._matrix.ParamCategories, 'EnglishName');
        for (let i of this._matrix.ParamCategories) {
          i.Params = this._util.sortBy(i.Params, 'EnglishName');
        }
      });
  }
}
