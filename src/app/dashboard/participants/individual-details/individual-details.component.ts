import { Component, OnInit, Input } from '@angular/core';

import { Participant } from '../../../shared/models/participants.model';
import { MapsService } from '../../../shared/services/maps.service';

@Component({
  selector: 'individual-details',
  templateUrl: './individual-details.component.html',
  styleUrls: ['./individual-details.component.css']
})
export class IndividualDetailsComponent implements OnInit {
  position: any;
  lng: number;
  lat: number;
  @Input() individual: Participant;
  constructor(private _map: MapsService) {}

  ngOnInit() {
    if (this.individual.address) {
      this._map.getPosition(this.individual.address).subscribe(position => {
        this.position = position.results[0].geometry.location;
      });
    }
  }
}
