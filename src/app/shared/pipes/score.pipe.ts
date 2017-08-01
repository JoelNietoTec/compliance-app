import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score',
  pure: false
})
export class ScorePipe implements PipeTransform {

  transform(value?: number): string {
    if (!value) {
      return 'N/A';
    } else if (value < 3) {
      return `<span class="font-weight-bold text-success">${value}</span>`;
    } else if (value < 6) {
      return `<span class="font-weight-bold text-warning">${value}</span>`;
    } else {
      return `<span class="font-weight-bold text-danger">${value}</span>`;
    }
  }
}
