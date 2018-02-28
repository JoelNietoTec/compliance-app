import { Component, OnInit, Input } from '@angular/core';
import { ParticipantProfilesService } from '../../../shared/services/participant-profiles.service';
import { Participant } from '../../../shared/models/participants.model';
import { ParticipantProfile } from '../../../shared/models/profiles.model';


@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})
export class ParticipantProfileComponent implements OnInit {
  @Input() participant: Participant;

  _profile: ParticipantProfile;

  constructor(private _profileServ: ParticipantProfilesService) {}

  ngOnInit() {
    this._profileServ.getProfile(this.participant.ID).subscribe(data => {
      this._profile = data;

    });
  }
}
