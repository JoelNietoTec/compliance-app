import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Participant, ParticipantParam } from '../../../shared/models/participants.model';
import { Param, ParamValue, ParamSubValue, ParamTable } from '../../../shared/models/params.model';

import { UtilService } from '../../../shared/services/util.service';
import { ParticipantsService } from '../../../shared/services/participants.service';
import { ParamTablesService } from '../../../shared/services/param-tables.service';
import { ParamValuesService } from '../../../shared/services/param-values.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'compliance-param',
  templateUrl: './participant-compliance-param.component.html',
  styleUrls: ['./participant-compliance-param.component.css']
})
export class ParticipantComplianceParamComponent implements OnInit {
  @Input() participant: Participant;
  @Input() partParams: Array<ParticipantParam>;
  @Input() param: Param;
  @Output() update = new EventEmitter();


  _partParam: ParticipantParam;
  _default: any = undefined;
  _value: any = {
    ID: null,
    Score: null
  };
  _currentValue: ParamValue;
  _currentSubValue: ParamSubValue;

  _values: ParamValue[];
  _subvalues: ParamSubValue[];

  constructor(
    private _util: UtilService,
    private _partService: ParticipantsService,
    private _valService: ParamValuesService,
    private _tableServ: ParamTablesService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit() {

    this._valService.getValuesByTable(this.param.paramTableId).subscribe(data => {

      this._values = data;
      this._values = this._util.sortBy(this._values, 'displayValue');
      for (const i of this._values) {
        i.subValues = this._util.sortBy(i.subValues, 'displayValue');
      }
      this.getParam();
    });
  }

  getParam() {
    this._partParam = this.partParams.find(item => item.paramId === this.param.id);
    this._currentValue = this._util.filterByID(this._values, this._partParam.paramValueId);
    if (this.param.table.type.id === 2 && this._partParam.paramSubValueId) {
      this._currentSubValue = this._currentValue.subValues.find(item => item.id === this._partParam.paramSubValueId);
    }
    this._value.id = this._partParam.paramValueId;
    this._value.Score = this._partParam.score;
  }

  updateParam(event: string) {
    if (this.param.table.type.id === 2) {
      this._partParam.paramValueId = this._currentSubValue.paramValueId;
      this._partParam.paramValue = this._util.filterByID(this._values, this._currentSubValue.paramValueId);
      this._partParam.paramSubValueId = this._currentSubValue.id;
      this._partParam.paramSubValue = this._currentSubValue;
      this._partParam.score = this._currentSubValue.score;
    } else {
      this._partParam.paramValueId = this._currentValue.id;
      this._partParam.paramValue = this._currentValue;
      this._partParam.score = this._currentValue.score;
    }

    this._partService.updateParam(this._partParam.id, this._partParam).subscribe(data => {
      this.toastr.success(this.param.name, 'Parámetro actualizado');
      this.update.emit(this._partParam);
    });
  }
}
