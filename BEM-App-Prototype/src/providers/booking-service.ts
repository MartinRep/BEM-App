import { UserService } from './user-service';
import { AuthService } from './auth-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BookingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class BookingService {
  bookRequest: any;

  constructor(public http: Http, public auth: AuthService, public userService: UserService) {
    console.log('Hello BookingService Provider');
  }

public book(booking){
  this.auth.addBooking(booking);
  console.log('Booking Added.');
  console.log(this.auth.getUserInfo());
  //this.userService.
}


}
