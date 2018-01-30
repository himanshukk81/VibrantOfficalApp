import { Pipe, PipeTransform } from '@angular/core';

import { Event } from './event';

@Pipe({
    name: 'eventfilter',
    pure: false
})
export class EventFilterPipe implements PipeTransform {
  transform(items: Event[], filter: Event): Event[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Event) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
  applyFilter(event: Event, filter: Event): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (event[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (event[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}