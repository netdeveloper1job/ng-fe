import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Pipe({
  name: 'rangeFilter'
})
export class RangeFilterPipe implements PipeTransform {
  constructor(public formatter: NgbDateParserFormatter){}
  transform(value: any, from:any,to:any,property:string): unknown {
    if (value?.length === 0 || !from || !to) {
      return value;
    }
    let filtered = [];
    for (let data of value) {
      if (moment(data[property]).format('M/D/YYYY') >= moment(this.formatter.format(from)).format('M/D/YYYY') && moment(data[property]).format('M/D/YYYY') <= moment(this.formatter.format(to)).format('M/D/YYYY')) {
        filtered.push(data);
      }
    }
    return filtered;
  }

}
