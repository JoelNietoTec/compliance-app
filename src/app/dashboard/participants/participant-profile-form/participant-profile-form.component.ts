import { Component, OnInit, Input } from '@angular/core';
import { ParticipantProfile } from '../../../shared/models/profiles.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-participant-profile-form',
  templateUrl: './participant-profile-form.component.html',
  styleUrls: ['./participant-profile-form.component.css']
})
export class ParticipantProfileFormComponent implements OnInit {
  @Input() currentProfile: ParticipantProfile;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
