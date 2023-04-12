import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnFilter',
})
export class ColumnFilterPipe implements PipeTransform {
  transform(value: any, filterString: string, property: string): any {
    if (value?.length === 0 || !filterString) {
      return value;
    }
    let filtered = [];
    for (let data of value) {
      if (data[property].toLowerCase().includes(filterString.toLowerCase())) {
        filtered.push(data);
      }
    }
    return filtered;
  }
}
