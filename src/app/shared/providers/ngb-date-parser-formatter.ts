import { Injectable } from '@angular/core';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class NgbDateCustomParserFormatte extends NgbDateParserFormatter {
  public placeholder = '';

  constructor() {
    super();
    this.placeholder = this.getDatePattern(window.navigator.language);
  }

  getDatePattern(locale) {
    var formatter = new Intl.DateTimeFormat(locale).formatToParts();

    return formatter
      .map(function (e) {
        switch (e.type) {
          case 'month':
            return 'MM';
          case 'day':
            return 'DD';
          case 'year':
            return 'YYYY';
          default:
            return e.value;
        }
      })
      .join('');
  }

  parse(value: string): NgbDateStruct {
    if (value) {
      value = value.trim();
      let mdt = moment(value, this.placeholder);
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    if (!date) return '';
    let mdt = moment([date.year, date.month - 1, date.day]);
    if (!mdt.isValid()) return '';
    return mdt.format(this.placeholder);
  }
}
