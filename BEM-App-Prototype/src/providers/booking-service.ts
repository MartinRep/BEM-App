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
  /**Variable Declaration */
  bookings: Array<any>;
  salon: any;
  /**Cosntructor */
  constructor(public http: Http, public auth: AuthService, public userService: UserService) {
  }
  //**Promise: User's Bookings */
  public loadBookings() {
    return Observable.create(observer => {
      this.userService.getUserBookings(this.auth.currentUser.username).subscribe(
        data => {
          if (data.success) {
            this.bookings = data.bookings;
          }
          observer.next(data.success);
          observer.complete();
        }
      );
    });
  }
  //**Promise: Salon Details */
  public loadSalonDetails(salonID) {
    return Observable.create(observer => {
      this.userService.findSalon(salonID).subscribe(
        data => {
          if (data.success) {
            this.salon = data.salon;
          }
          observer.next(data.success);
          observer.complete();
        }
      );
    });
  }
  //**Promise: Success on selecting salon */
  public acceptOffer(payload) {
    return Observable.create(observer => {
      this.userService.acceptOffer(payload).subscribe(
        data => {
          if (data.success) {
            this.salon = data.salon;
          }
          observer.next(data.success);
          observer.complete();
        }
      );
    });
  }
  //**Promise: Success on Posting rewiew */
  public postReview(review) {
    return Observable.create(observer => {
      this.userService.postReview(review).subscribe(
        data => {
          if (data.success) {
            this.salon = data.salon;
          }
          observer.next(data.success);
          observer.complete();
        }
      );
    });
  }
  //**Promise: Success on Booking */
  public book(booking) {
    let newBooking = { 'username': this.auth.currentUser.username, 'booking': booking };
    return Observable.create(observer => {
      this.userService.book(newBooking).subscribe(
        data => {
          observer.next(data.success);
          observer.complete();
        }
      );
    });
  }
  /**Return array of bookings */
  public getBookings() {
    return this.bookings;
  }
  /** Add booking to array*/
  public addBooking(booking) {
    this.bookings.push(booking);
  }
}
