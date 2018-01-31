import { Pipe, PipeTransform } from '@angular/core';

import { Event } from './event';
declare var eventInfo:any;
declare var filterInfo:any;
@Pipe({
    name: 'eventfilter',
    pure: false
})
export class EventFilterPipe implements PipeTransform {
  
  transform(items: Event[], filter: Event): Event[] {
    if (!items || !filter) {
      return items;
    }
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
    var eventInfo;
    var filterInfo;

          eventInfo=event;
          filterInfo=filter;
          if(eventInfo.venueName.toLowerCase().indexOf(filterInfo.toLowerCase())==0){
            return true;
          }
      }
    }
    