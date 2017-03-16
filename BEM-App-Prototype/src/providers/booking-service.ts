import { Observable } from 'rxjs/Observable';
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
  bookings: Array<any>;

  constructor(public http: Http, public auth: AuthService, public userService: UserService) {
    console.log('Hello BookingService Provider');
  }

  public loadBookings(username) {
    return Observable.create(observer => {
      // At this point make a request to backend to make a real check!
      //testing server connection
      this.userService.getUserBookings(username).subscribe(
        data => {
          if (data.success) {
            this.bookings = data.bookings;
          }
          observer.next(data.success);
          observer.complete();
        }
      );
      //end of testing connection
    });
  }

  public book(booking){
    let newBooking = {'username':this.auth.currentUser.username, 'booking':booking};
    return Observable.create(observer => {
      // At this point make a request to backend to make a real check!
      //testing server connection
      this.userService.book(newBooking).subscribe(
        data => {
          if (data.success) {
            this.bookings.push(data.bookings);
          }
          observer.next(data.success);
          observer.complete();
        }
      );
      //end of testing connection
    });
  }

  public getBookings() {
    return this.bookings;
  }

  public addBooking(booking) {
    this.bookings.push(booking);
  }
}
