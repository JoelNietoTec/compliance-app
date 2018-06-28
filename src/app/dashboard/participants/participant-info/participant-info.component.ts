import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../../../shared/models/participants.model';
import { MapsService } from '../../../shared/services/maps.service';

@Component({
  selector: 'participant-info',
  templateUrl: './participant-info.component.html',
  styleUrls: ['./participant-info.component.css']
})
export class ParticipantInfoComponent implements OnInit {
  position: any;
  lng: number;
  lat: number;

  @Input() participant: Participant;
  constructor(private _map: MapsService) {}

  ngOnInit() {
    if (this.participant.address) {
      this._map.getPosition(this.participant.address).subscribe(ps => {
        this.position = ps.results[0].geometry.location;
      });
    }
  }
}
