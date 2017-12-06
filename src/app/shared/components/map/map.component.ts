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

  ngOnInit() {}
  ngAfterViewInit() {
    var regions = this.regions;

    $(function() {
      $('#world-map').vectorMap({
        map: 'world_mill',
        series: {
          regions: [{
              values: regions,
              scale: ['#C8EEFF', '#0071A4'],
              normalizeFunction: 'polynomial'
            }]
        },
        onRegionTipShow: function(e, el, code) {
          el.html(el.html() + ' (Participantes - ' + regions[code] + ')');
        }
      });
    });
  }
}
