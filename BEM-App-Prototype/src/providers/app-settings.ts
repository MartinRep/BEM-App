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

  public getLocations() {
    return ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Athlone', 'Clonmel', 'Mulligar', 'Letterkenny', 'Tralee', 'Tullamore', 'Kilkenny', 'Killarney', 'Bray'];
  }

  public getServices() {
    return ['Salon / Clinic', 'Hair Salon', 'Dental', 'Gym', 'Spa', 'Nutritionist', 'Personal Trainer', 'Yoga/Pilates'];
  }
  public getDates() {
    return [Date(), Date() + 1, Date() + 2];
  }
  public getTimes() {
    return [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  }
  public getTimeMargin() {
    return ['15', '30'];
  }
  public getTravelTime() {
    return ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours'];
  }

}
