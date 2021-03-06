import * as _ from 'underscore';
import { Injectable } from '@angular/core';
import { element } from 'protractor';

@Injectable()
export class UtilService {
  constructor() {}

  get months() {
    return [
      { id: 1, name: 'Enero', shortName: 'Ene' },
      { id: 2, name: 'Febrero', shortName: 'Feb' },
      { id: 3, name: 'Marzo', shortName: 'Mar' },
      { id: 4, name: 'Abril', shortName: 'Abr' },
      { id: 5, name: 'Mayo', shortName: 'May' },
      { id: 6, name: 'Junio', shortName: 'Jun' },
      { id: 7, name: 'Julio', shortName: 'Jul' },
      { id: 8, name: 'Agosto', shortName: 'Ago' },
      { id: 9, name: 'Septiembre', shortName: 'Sep' },
      { id: 10, name: 'Octubre', shortName: 'Oct' },
      { id: 11, name: 'Noviembre', shortName: 'Nov' },
      { id: 12, name: 'Diciembre', shortName: 'Dic' }
    ];
  }

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
    return array.find(item => item.id === Number(id));
  }

  removeByID(array: Array<any>, id: number): Array<any> {
    return array.filter(item => item.id !== id);
  }

  mapDistinct(array: any[], field: string): any[] {
    const items = array.map(x => x[field]);
    let result = [];
    items.forEach(element => {
      if (!result.includes(element)) {
        result.push(element);
      }
    });
    return result;
  }

  mapCountItems(array: any[], field: string): any[] {
    const items = array.map(x => this.getProperty(x, field));
    let result = [];
    items.forEach(element => {
      if (result.filter(e => e.name === element).length === 0) {
        let item: any = {};
        item.name = element;
        item.count = 1;
        result.push(item);
      } else {
        let item = result.find(e => e.name === element);
        item.count++;
      }
    });
    return result;
  }

  mapCount(array: any[], field: string): any {
    const items = array.map(x => this.getProperty(x, field));
    let result = {};
    items.forEach(element => {
      if (!result[element]) {
        result[element] = 1;
      } else {
        result[element]++;
      }
    });
    return result;
  }

  searchFilter(array: Array<any>, args: Array<string>, searchText: string): Array<any> {
    let filterArray: Array<any> = [];

    searchText = searchText.toLocaleLowerCase();

    for (let item of array) {
      let term = '';
      for (let col of args) {
        term = term + this.isNullString(this.getProperty(item, col));
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

  capitalize(str: string): string {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  }

  paginate(itemsCount: number, currentPage: number = 1, pageSize: number = 10) {
    const totalPages: number = Math.ceil(itemsCount / pageSize) + 1;
    let startPage: number, endPage: number;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, itemsCount - 1);

    const pages = _.range(startPage, endPage);

    return {
      totalItems: itemsCount,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  updateItem(item: any, array: any[]): any[] {
    const objIndex = array.findIndex(obj => obj.ID === item.ID);
    array[objIndex] = item;
    return array;
  }

  getProperty(item: any, property: string): any {
    property.split('.').forEach(e => {
      item = item[e];
    });
    return item;
  }

  convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    objArray.forEach(index => {
      row += index + ',';
    });

    row = row.slice(0, -1);
    str += row + '\r\n';
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      let line = '';

      for (const index in array[i]) {
        if (line !== '') {
          line += ',';
        }
        line += array[i][index];
      }

      str += line + '\r\n';
    }
    return str;
  }
}
