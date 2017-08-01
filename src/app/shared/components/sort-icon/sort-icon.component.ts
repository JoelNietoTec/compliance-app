import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sort-icon',
  templateUrl: './sort-icon.component.html',
  styleUrls: ['./sort-icon.component.css']
})
export class SortIconComponent implements OnInit {

  @Input() desc?: Boolean;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
