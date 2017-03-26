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
  salon: any;

  constructor(public http: Http, public auth: AuthService, public userService: UserService) {
    console.log('Hello BookingService Provider');
  }

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

  public book(booking){
    let newBooking = {'username':this.auth.currentUser.username, 'booking':booking};
    return Observable.create(observer => {
      // At this point make a request to backend to make a real check!
      //testing server connection
      this.userService.book(newBooking).subscribe(
        data => {
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
