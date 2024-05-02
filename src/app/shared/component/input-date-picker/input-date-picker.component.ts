import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {
  NgbDateStruct,
  NgbPopover,
  NgbPopoverConfig,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { DateTimeModel } from '../../models/date-time.model';
import { applyColumn } from '../../utils/form-utils';
import { BaseCustomInputComponent } from '../base-custom-input/base-custom-input.component';

@Component({
  selector: '[input-date-picker]',
  templateUrl: './input-date-picker.component.html',
  styleUrls: ['./input-date-picker.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDatePickerComponent),
      multi: true,
    },
  ],
})
export class InputDatePickerComponent
  extends BaseCustomInputComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  dateString: string;
  inputDatetimeFormat;
  placeholder;
  inputDatetimeMask;

  @Input() onlyDate = true;
  @Input() columnSize: number | string = 3;
  @Input() label = '';
  @Input() id = '';
  @Input() hourStep = 1;
  @Input() minuteStep = 1;
  @Input() secondStep = 30;
  @Input() seconds = true;
  @Input() disabled = false;
  @Input() formControl: AbstractControl | null = null;

  public showTimePickerToggle = false;
  public datetime: DateTimeModel = new DateTimeModel();
  private firstTimeAssign = true;
  public required = false;

  @ViewChild('dp') dp;
  @ViewChild(NgbPopover) popover: NgbPopover;
  @ViewChild('input') input;

  public override onTouched: () => void = noop;
  public override onChange: (_: any) => void = noop;

  public ngControl: NgControl;

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
    private config: NgbPopoverConfig
  ) {
    super();
    config.autoClose = 'outside';
    config.placement = 'auto';
  }

  ngOnInit(): void {
    this.inputDatetimeFormat = this.getDatePattern(window.navigator.language);
    this.placeholder = this.inputDatetimeFormat;
    if (!this.seconds) {
      this.placeholder = this.placeholder.replace(':ss', '');
    }

    if (this.controlContainer) {
      if (this.formControlName) {
        this.formControl = this.controlContainer!!.control!!.get(
          this.formControlName
        );
      } else {
        console.warn(
          'Missing FormControlName directive from host element of the component'
        );
      }
    }

    if (this.disabled === undefined) {
      this.disabled = false;
    }

    this.checkValidations();
  }

  checkValidations() {
    if (!this.formControl || !this.formControl.validator) return;

    const validator = this.formControl!!.validator({} as AbstractControl);

    if (validator && validator['required']) {
      this.required = true;
    }
  }

  ngAfterViewInit(): void {
    this.popover.hidden.subscribe(($event) => {
      this.showTimePickerToggle = false;
    });
    applyColumn(this.id, this.columnSize);
  }

  override writeValue(newModel: string) {
    if (newModel) {
      this.datetime = Object.assign(
        this.datetime,
        DateTimeModel.fromLocalString(newModel, this.onlyDate)
      );
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.datetime = new DateTimeModel();
    }
  }

  override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  override registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDateTimeState($event) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange($event: any) {
    const value = $event.target.value;
    const dt = DateTimeModel.fromLocalString(value, this.onlyDate);
    if (dt == null || value == '') {
      this.dateString = null;
      this.input.nativeElement.value = null;
      this.onChange(null);
      return;
    }

    if (dt) {
      this.datetime = dt;
      this.setDateStringModel();
    } else if (value.trim() === '') {
      this.datetime = new DateTimeModel();
      this.dateString = '';
      this.onChange(this.dateString);
    } else {
      this.onChange(value.toISOString());
    }
  }

  onDateChange($event: string | NgbDateStruct) {
    if (typeof $event === 'object' && $event.year) {
      $event = `${$event.year}-${$event.month}-${$event.day}`;
    } else if (typeof $event === 'object') {
      $event = '';
    }

    const date = DateTimeModel.fromLocalString($event, this.onlyDate);

    if (!date) {
      this.dateString = this.dateString;
      return;
    }

    if (!this.datetime) {
      this.datetime = date;
    }

    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;

    this.setDateStringModel();
  }

  onTimeChange(event: NgbTimeStruct) {
    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;

    this.setDateStringModel();
  }

  setDateStringModel() {
    this.dateString = this.datetime.toString();
    let date = new Date(Date.parse(this.dateString));

    this.formControl.markAsTouched();
    this.formControl.updateValueAndValidity();

    this.onChange(date.toISOString());

    this.dateString = this.dateString.substring(0, this.dateString.length - 6);
  }

  inputBlur($event) {
    this.onTouched();
  }

  getDatePattern(locale) {
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).formatToParts(new Date());

    const pattern = formatter
      .map(function (e) {
        e.value = e.value.replace(',', '');
        switch (e.type) {
          case 'year':
            return 'yyyy';
          case 'month':
            return 'MM';
          case 'day':
            return 'dd';
          case 'hour':
            return 'HH';
          case 'minute':
            return 'mm';
          case 'second':
            return 'ss';
          case 'literal':
            return e.value;
          default:
            return '';
        }
      })
      .join('');

    this.inputDatetimeMask = pattern
      .replace('dd', 'd0')
      .replace('MM', 'M0')
      .replace('yyyy', '0000')
      .replace('HH', 'Hh')
      .replace('mm', 'm0')
      .replace('ss', 's0');

    if (!this.seconds) {
      this.inputDatetimeMask = this.inputDatetimeMask.replace(':s0', '');
    }

    if (this.onlyDate) {
      this.inputDatetimeMask = this.inputDatetimeMask.split(' ')[0];
      return pattern.split(' ')[0];
    }

    return pattern;
  }
}
