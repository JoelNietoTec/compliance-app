import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Roadmap } from '../../../shared/models/roadmap.model';

@Component({
  selector: 'roadmaps-form',
  templateUrl: './roadmaps-form.component.html',
  styleUrls: ['./roadmaps-form.component.css']
})
export class RoadmapsFormComponent implements OnInit {
  @Input() currentRoadmap: Roadmap;

  constructor() { }

  ngOnInit() {
  }

}
