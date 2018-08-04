import { Participant, Segment } from './../../models/participants.model';
import { ParticipantsService } from './../../services/participants.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Param } from '../../models/params.model';

@Component({
  selector: 'segment-list',
  templateUrl: './segment-list.component.html',
  styleUrls: ['./segment-list.component.css']
})
export class SegmentListComponent implements OnInit {
  @Input() param: Param;
  @Input() segment: Segment;

  _participants: Observable<Participant[]>;

  constructor(private _participantServ: ParticipantsService) {}

  ngOnInit() {
    if (this.param.table.tableTypeId === 1) {
      this._participants = this._participantServ.getSegmentMembers(
        this.param.id,
        this.segment.valueId
      );
    } else {
      this._participants = this._participantServ.getSegmentMembers(
        this.param.id,
        this.segment.subValueId
      );
    }
  }
}
