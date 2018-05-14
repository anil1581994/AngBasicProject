import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  /**
   * @param items object from array
   * @param term term's search//term==>searchText
   */
   transform(items: any, searchText: string): any {
    if (!searchText || !items) return items;

    return SearchFilterPipe.filter(items, searchText);
  }

/**
   * 
   * @param items List of items to filter
   * @param term  a string term to compare with every property of the list
   * 
   */
  static filter(items: Array<{ [key: string]: any }>, searchText: string): Array<{ [key: string]: any }> {

    const toCompare = searchText.toLowerCase();

    return items.filter(function (item: any) {
      for (let property in item) {
        if (item[property] === null) {
          continue;
        }
        if (item[property].toString().toLowerCase().includes(toCompare)) {
          return true;
        }
      }
      return false;
    });
  }


}
