import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  sortBy(array: Array<any>, args: string, desc?: boolean): Array<any> {
    if (desc) {
      array.sort((a: any, b: any) => {
        if (!a[args]) {
          return 1;
        } else if (!b[args]) {
          return -1;
        } else if (a[args] < b[args]) {
          return 1;
        } else if (a[args] > b[args]) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      array.sort((a: any, b: any) => {
        if (!a[args]) {
          return -1;
        } else if (!b[args]) {
          return 1;
        } else if (a[args] < b[args]) {
          return -1;
        } else if (a[args] > b[args]) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    return array;
  }

  filterByID(array: Array<any>, id: number): any {
    return array.find(item => item.ID === id);
  }

  searchFilter(array: Array<any>, args: Array<string>, searchText: string): Array<any> {
    let filterArray: Array<any> = [];

    searchText = searchText.toLocaleLowerCase();

    for (let item of array) {
      let term = '';
      for (let col of args) {
        term = term + this.isNullString(item[col]);
      }
      term = term.toLocaleLowerCase();
      if (term.indexOf(searchText) >= 0) {
        filterArray.push(item);
      }
    }
    return filterArray;
  }

  getAge(birthdate: Date): number {
    const NOW = new Date();
    let date = new Date(birthdate);
    return NOW.getFullYear() - date.getFullYear();
  }

  isNullString(str?: string): string {
    return str || '';
  }

}
