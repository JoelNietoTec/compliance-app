import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements OnInit {
  @Input() items: any[];
  @Input() label: string;
  @Input() data: string;
  @Input() options: any;
  @Input() type?: string;
  @Input() colors?: string[];
  @Input() title?: string;

  _labels: Array<string>;
  _values: Array<number>;
  constructor() {}

  ngOnInit() {
    this._labels = [];
    this._values = [];

    if (!this.title) {
      this.title = this.options.title.text;
    }

    this.items.forEach(element => {
      this._labels.push(element[this.label]);
      this._values.push(element[this.data]);
    });
  }
}
