import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input() regions: any;

  constructor() {}

  ngOnInit() {
  }
  ngAfterViewInit() {
    var regions = this.regions;

    $(function() {
      $('#vmap').vectorMap({
        map: 'world_en',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        showLabels: true,
        values: regions,
        scaleColors: ['#C8EEFF', '#0071A4'],
        normalizeFunction: 'polynomial',
        onLabelShow: function(event, label, code) {
          if (regions[code]) {
            label.append(': ' + regions[code] + ' participantes');
          }
        }
      });
    });
  }
}
