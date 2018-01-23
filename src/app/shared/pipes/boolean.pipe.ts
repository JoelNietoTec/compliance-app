import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {
  transform(value: boolean, args?: any): string {
    if (value) {
      // return '<i class="fa fa-check fa-lg text-success" aria-hidden="true"></i>';
      return 'Sí';
    } else if (value === false) {
      // return '<i class="fa fa-times fa-lg text-danger" aria-hidden="true"></i>';
      return 'No';
    } else {
      return '--';
    }
  }
}
