import { BookingDetailsPage } from './../booking-details/booking-details';
import { AuthService } from './../../providers/auth-service';
import { BookingService } from './../../providers/booking-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ManageBookings page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-manage-bookings',
  templateUrl: 'manage-bookings.html'
})
export class ManageBookingsPage {
  /**Variable declaration */
  bookings: any;
  /**Constructor. */
  constructor(public navCtrl: NavController, public navParams: NavParams, public bookingService: BookingService) {
    /** On creation request bookings from server and cache them */
    this.bookingService.loadBookings();
    this.bookings = this.bookingService.getBookings();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageBookingsPage');
  }


  /** Navigate to Booking Details of arg booking */
  public getDetails(booking) {
    this.navCtrl.push(BookingDetailsPage, booking);
  }

}
