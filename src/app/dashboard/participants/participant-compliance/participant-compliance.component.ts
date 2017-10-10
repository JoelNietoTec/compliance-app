import { Component, OnInit, Input } from '@angular/core';

import { ParamTable, ParamMatrix, ParamCategory } from '../../../shared/models/params.model';
import { Participant, ParticipantParam } from '../../../shared/models/participants.model';
import { ParamMatricesService } from '../../../shared/services/param-matrices.service';
import { ParamCategoriesService } from '../../../shared/services/param-categories.service';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'participant-compliance',
  templateUrl: './participant-compliance.component.html',
  styleUrls: ['./participant-compliance.component.css']
})

export class ParticipantComplianceComponent implements OnInit {
  @Input() participant: Participant;

  _matrix: ParamMatrix;
  _matrices: Array<ParamMatrix>;
  _partParams: Array<ParticipantParam>;
  _categories: Array<ParamCategory>;

  constructor(
    private _matrixService: ParamMatricesService,
    private _partService: ParticipantsService,
    private _categoriesService: ParamCategoriesService,
    private _util: UtilService
  ) { }

  ngOnInit() {
    this.getCategories();
    this._partService.getParams(this.participant.ID)
      .subscribe(data => {
        this._partParams = data;
      });

    this._matrixService.getMatrix(this.participant.ParamMatrixID)
      .subscribe(data => {
        this._matrix = data;

      });
  }

  getCategories() {
    this._categoriesService.getCategoriesByMatrix(this.participant.ParamMatrixID)
      .subscribe(data => {
        this._categories = data;
        this._categories = this._util.sortBy(this._categories, 'EnglishName');
        for (let i of this._categories) {
          i.Params = this._util.sortBy(i.Params, 'EnglishName');
        }
      });
  }
}
