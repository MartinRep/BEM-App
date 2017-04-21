import { BookingService } from './../../providers/booking-service';
import { ManageBookingsPage } from './../manage-bookings/manage-bookings';
import { BookingPage } from './../booking/booking';
import { LoginPage } from './../login/login';
import { AuthService } from './../../providers/auth-service';
import { UserService } from './../../providers/user-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Menu page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})


export class MenuPage {
  /**Variable declaration */
  user: {};
  bookings: {};
  /**Constructor */
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public auth: AuthService, public bookingService: BookingService) {
  }
  /**On load get User details */
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.getUserDetails();
  }
  /**Request user details from server and cache them */
  private getUserDetails() {
    this.userService.findUser(this.auth.currentUser.username).subscribe(data => {
      this.user = data;
      console.log(this.user);
    },
      error => {
        console.log('Error finding user');
      });

  }
  /**Log out */
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }
  /**Navigate to create booking */
  public createBooking() {
    this.navCtrl.push(BookingPage);
  }
  /**Request bookings from server and anavigate to Manage Bookings */
  public manageBookings() {
    this.bookingService.loadBookings().subscribe(success => {
      this.navCtrl.push(ManageBookingsPage);
    },
      error => {
        console.log('Error finding bookings');
      });
  }
}
