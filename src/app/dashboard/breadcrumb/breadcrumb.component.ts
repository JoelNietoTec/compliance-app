import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  routes: Array<string>;
  path: string;

  constructor(location: Location, private router: Router) {
    router.events.subscribe(val => {
      if (location.path() !== '' && location.path() !== this.path) {
        this.routes = [];
        this.path = location.path();
        this.path.split('/').forEach(e => {
          if (e !== '' && e !== 'home' && e !== 'app') {
            this.routes.push(e);
          }
        });
      }
    });
  }

  ngOnInit() {}
}
