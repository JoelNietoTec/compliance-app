import { Component, OnInit } from '@angular/core';

import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private breadcrumb: BreadcrumbService
  ) {

  }

  ngOnInit() {
    this.breadcrumb.hideRoute('/Home');
  }

}
