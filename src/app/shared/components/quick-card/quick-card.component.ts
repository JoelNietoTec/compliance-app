import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quick-card',
  templateUrl: './quick-card.component.html',
  styleUrls: ['./quick-card.component.css']
})

export class QuickCardComponent implements OnInit {
  @Input() icon: string;
  @Input() value: number;
  @Input() type: string;
  @Input() name: string;

  constructor() { }

  ngOnInit() { }
}
