import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent implements OnInit {
  @Input() class?: String = 'primary';
  @Input() size?: string;
  @Input() outline?: Boolean = false;


  constructor() { }

  ngOnInit() {
  }

}
