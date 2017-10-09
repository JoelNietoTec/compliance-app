import {ToastOptions} from 'ng2-toastr';

export class ToastOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  positionClass = 'toast-top-right';
}
