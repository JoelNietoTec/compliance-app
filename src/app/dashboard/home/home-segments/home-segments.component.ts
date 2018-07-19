import { Component, OnInit } from '@angular/core';
import { ParamsService } from '../../../shared/services/params.service';
import { Observable } from 'rxjs';
import { Param } from '../../../shared/models/params.model';

@Component({
  selector: 'app-home-segments',
  templateUrl: './home-segments.component.html',
  styleUrls: ['./home-segments.component.css']
})
export class HomeSegmentsComponent implements OnInit {

  _params: Observable<Param[]>;

  constructor(private _paramService: ParamsService) { }

  ngOnInit() {
    this._params = this._paramService.getParams();
  }

}
