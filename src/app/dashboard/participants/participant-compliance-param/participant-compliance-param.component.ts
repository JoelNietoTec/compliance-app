import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Participant, ParticipantParam } from '../../../shared/models/participants.model';
import { Param, ParamValue, ParamSubValue, ParamTable } from '../../../shared/models/params.model';

import { UtilService } from '../../../shared/services/util.service';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'compliance-param',
  templateUrl: './participant-compliance-param.component.html',
  styleUrls: ['./participant-compliance-param.component.css']
})
export class ParticipantComplianceParamComponent implements OnInit {
  @Input() participant: Participant;
  @Input() partParams: Array<ParticipantParam>;
  @Input() param: Param;

  _partParam: ParticipantParam;
  _default: any = undefined;
  _value: any = {
    ID: null,
    Score: null
  };
  _currentValue: ParamValue;
  _currentSubValue: ParamSubValue;

  _values: Array<ParamValue>;
  _subvalues: Array<ParamSubValue>;

  constructor(
    private _util: UtilService,
    private _partService: ParticipantsService,
    private _tableServ: ParamTablesService,
    private toastr: ToastsManager,
    private _router: Router
  ) {}

  ngOnInit() {
    // this._partParam = this._util.filterByID(this.partParams, this.param.ID);
    this._tableServ.getValuesByTable(this.param.ParamTableID).subscribe(data => {
      this._values = data;
      this._values = this._util.sortBy(this._values, 'DisplayValue');
      for (const i of this._values) {
        i.ParamSubValues = this._util.sortBy(i.ParamSubValues, 'DisplayValue');
      }
      this.getParam();
    });
  }

  getParam() {
    this._partParam = this.partParams.find(item => item.ParamID === this.param.ID);
    this._currentValue = this._values.find(item => item.ID === this._partParam.ParamValueID);
    if (this.param.ParamTable.TableType.ID === 2 && this._partParam.ParamSubValueID) {
      this._currentSubValue = this._currentValue.ParamSubValues.find(item => item.ID === this._partParam.ParamSubValueID);
    }
    this._value.ID = this._partParam.ParamValueID;
    this._value.Score = this._partParam.Score;
  }

  updateParam(event: string) {
    if (this.param.ParamTable.TableType.ID === 2) {
      this._partParam.ParamValueID = this._currentSubValue.ParamValueID;
      this._partParam.ParamValue = this._util.filterByID(this._values, this._currentSubValue.ParamValueID);
      this._partParam.ParamSubValueID = this._currentSubValue.ID;
      this._partParam.ParamSubValue = this._currentSubValue;
      this._partParam.Score = this._currentSubValue.Score;
    } else {
      this._partParam.ParamValueID = this._currentValue.ID;
      this._partParam.ParamValue = this._currentValue;
      this._partParam.Score = this._currentValue.Score;
    }

    this._partService.updateParam(this._partParam.ID, this._partParam).subscribe(data => {
      this.toastr.success(this.param.EnglishName, 'Updated Parameter');
    });
  }
}
