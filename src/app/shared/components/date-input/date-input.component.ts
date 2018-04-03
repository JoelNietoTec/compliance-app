import { Component, OnInit, Input, OnChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateInputComponent), multi: true }]
})
export class DateInputComponent implements ControlValueAccessor {
  _currentDate: NgbDateStruct;
  constructor(private _dateFormatter: NgbDateParserFormatter) {}

  // ngOnInit() {
  //   if (this.date) {
  //     this._currentDate = this._dateFormatter.parse(this.date.toString());
  //   }
  // }
  get value(): Date {
    return new Date(this._dateFormatter.format(this._currentDate));
  }

  onChange = (date: any) => {};

  change() {
    this.onChange(this.value);
  }

  onTouched = () => {};

  writeValue(date: Date): void {
    if (date) {
      this._currentDate = this._dateFormatter.parse(date.toString());
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
