import { BookingService } from './../../providers/booking-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SalonDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-salon-details',
  templateUrl: 'salon-details.html'
})

export class SalonDetailsPage {
  /**Variable Declaration */
  salon: any;
  salonName: String;
  /**Constructor */
  constructor(public navCtrl: NavController, public navParams: NavParams, public bookingService: BookingService) {
    /**Set salon to arg */
    this.salon = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalonDetailsPage');

  }
  /**Parse rating from number to stars */
  public getStarRating(rating) {
    let ratingStarArray = [];
    for (var index = 1; index <= rating; index++) {
      ratingStarArray.push(index);
    }
    return ratingStarArray;

  }


}
