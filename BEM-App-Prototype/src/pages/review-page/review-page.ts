import { BookingService } from './../../providers/booking-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ReviewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-review-page',
  templateUrl: 'review-page.html'
})
export class ReviewPagePage {
  /**Variable declaration */
  rating: Number;
  reviewText = '';
  booking: any;
  /**Constructor */
  constructor(public navCtrl: NavController, public navParams: NavParams, public bookingService: BookingService) {
    //Default rating is 5
    this.rating = 5;
    this.booking = this.navParams.data;
    console.log(this.booking);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPagePage');
  }
  /**Set rating value based on star clicked. Change colors in view to reflect rating */
  public setRating(rating) {
    this.rating = rating;
    for (var index = 1; index <= 5; index++) {
      let star = document.getElementById(index + 'star');
      if (index <= rating) {
        star.style.color = 'orange';
      } else {
        star.style.color = 'black';
      }
    }
  }
  /**
   * Create a review and send it to server to update booking. Return to Main Menu.
   */
  public postReview() {

    let review = {
      bookingID: this.booking._id,
      salonID: this.booking.selected[0].salonID,
      review: {
        rating: this.rating,
        reviewText: this.reviewText
      }
    }
    this.bookingService.postReview(review).subscribe(success => {
      this.navCtrl.popToRoot();
    },
      error => {
        console.log('Error posting review');
      });;
    console.log(review);

  }


}
