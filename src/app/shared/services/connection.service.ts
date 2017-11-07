import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConnectionService {
  public APIUrl: string;
  // readonly MAP_KEY = 'AIzaSyCa6QaPQGQ-WhsE13BxIO40At9I1wWa3h4';
  readonly MAP_KEY = 'AIzaSyB7K_EiA1MSRPKh7Yk4dgkbMAYan4elt5A';

  constructor() {
    this.APIUrl = environment.apiURL;
  }
}
