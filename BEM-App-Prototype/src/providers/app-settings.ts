import { Injectable } from '@angular/core';

/*
  Generated class for the AppSettings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

const CONFIG = {
  apiURL: 'http://127.0.0.1:3000/'
}
@Injectable()
export class AppSettings {

  constructor() { }

  public getApiURL() {
    return CONFIG.apiURL;
  }

}
