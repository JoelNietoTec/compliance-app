import { Component, OnInit, Input } from '@angular/core';

import { Participant } from '../../../shared/models/participants.model';

@Component({
  selector: 'entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css']
})

export class EntityDetailsComponent implements OnInit {

  @Input() entity: Participant;

  constructor() { }

  ngOnInit() { }
}
