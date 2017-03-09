import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BookingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


export class BookingRequest {
  location: string;
  time: number;


  constructor() {
    
  }
}

@Injectable()
export class BookingService {
  bookRequest: BookingRequest;




  constructor(public http: Http) {
    console.log('Hello BookingService Provider');
  }

}
