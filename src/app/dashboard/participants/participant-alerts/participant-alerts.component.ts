import { Component, OnInit, Input } from '@angular/core';
import { ParticipantAlert } from '../../../shared/models/alerts.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-participant-alerts',
  templateUrl: './participant-alerts.component.html',
  styleUrls: ['./participant-alerts.component.css']
})
export class ParticipantAlertsComponent implements OnInit {
  @Input() currentAlert: ParticipantAlert;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
