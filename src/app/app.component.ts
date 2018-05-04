import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  title = 'app works!';

  public viewContainerRef: ViewContainerRef;

  public constructor(private toastrService: ToastrService, viewContainerRef: ViewContainerRef) {
    // this.viewContainerRef = viewContainerRef;

    // this.toastr.setRootViewContainerRef(viewContainerRef);

    toastrService.overlayContainer = this.toastContainer;
  }
}
