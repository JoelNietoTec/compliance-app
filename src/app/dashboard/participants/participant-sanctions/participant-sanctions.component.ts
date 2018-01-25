import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../../shared/models/sanctions.model';
import { ComparisonsService } from '../../../shared/services/comparisons.service';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'participant-sanctions',
  templateUrl: './participant-sanctions.component.html',
  styleUrls: ['./participant-sanctions.component.css']
})
export class ParticipantSanctionsComponent implements OnInit {
  @Input() participantID: number;

  _matches: Match[];

  constructor(private _util: UtilService, private _compServ: ComparisonsService) {}

  ngOnInit() {
    this._compServ.getMatchesByParticipant(this.participantID)
    .subscribe(data => {
      this._matches = data;
    });
  }
}
