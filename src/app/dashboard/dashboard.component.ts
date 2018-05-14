import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DocumentsService } from '../shared/services/documents.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private toast: ToastrService, private _docServ: DocumentsService) {}

  ngOnInit() {
    this._docServ.getExpired().subscribe(data => {
      console.log(data);
    });
  }
}
