import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(toFilter: any[], search: string, filterAttr: string): any {
    if (!toFilter) return [];
    if (!search) return toFilter;

    search = search.toLowerCase();
    return toFilter.filter(item => {
      if (filterAttr) {
        item = item[filterAttr];
      }

      if (typeof (item) !== 'string') {
        return false
      };

      return item.toLowerCase().includes(search);
    })
  }

}
