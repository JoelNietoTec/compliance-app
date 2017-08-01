import { Component, OnInit, Input } from '@angular/core';

import { Participant } from '../../../shared/models/participants.model';

@Component({
  selector: 'individual-details',
  templateUrl: './individual-details.component.html',
  styleUrls: ['./individual-details.component.css']
})

export class IndividualDetailsComponent implements OnInit {

  @Input() individual: Participant;
  constructor() { }

  ngOnInit() { }
}
