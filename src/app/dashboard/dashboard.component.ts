import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastrModule } from 'ngx-toastr';
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
      data.forEach(document => {
        this.toast.warning(document.type.name, document.participant.shortName);
      });
    });
  }
}
