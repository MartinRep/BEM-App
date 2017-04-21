import { ReviewPagePage } from './../review-page/review-page';
import { BookingService } from './../../providers/booking-service';
import { SalonDetailsPage } from './../salon-details/salon-details';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the BookingDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-booking-details',
  templateUrl: 'booking-details.html'
})
export class BookingDetailsPage {
  /**Variable declaration */
  bookingName: String;
  booking: any;
  /** Constructor */
  constructor(public navCtrl: NavController, public navParams: NavParams, public bookingService: BookingService, public alertCtrl: AlertController) {
    /**On page creation pass in booking which details are to be shown */
    this.booking = this.navParams.data;
    /**Parse date */
    var b: Date = new Date(this.booking.date);
    //I might have to change how it is stored in the db - Re-check booking form
    this.booking.date = b.toLocaleDateString();
    /**Setting title */
    this.bookingName = this.booking.service + ' in ' + this.booking.location;
  }
  /**On page loaded if booking status is completed show review option */
  ionViewDidLoad() {
    if (this.hasSelected()) {
      if (this.booking.status == 'completed') {
        var revBox = document.getElementById('reviewBox');
        revBox.style.visibility = 'visible';
      }
    }
  }
  /**Get details from server and pass values onto new Salon Details Page */
  private getDetails(salon) {
    this.bookingService.loadSalonDetails(salon.salonID).subscribe(success => {
      this.navCtrl.push(SalonDetailsPage, this.bookingService.salon);
    },
      error => {
        console.log('Error finding salon');
      });

  }
  /** Check whether a candidate has been selected and return either selected or list of candidates */
  private getCandidates() {
    if (this.booking.selected != null) {
      return this.booking.selected;
    } else {
      return this.booking.candidates;
    }
  }

  /**Set selected salon to arg. Call server updating booking. Return to main menu. */
  public selectSalon(salon) {
    if (!this.hasSelected()) {
      let payload = {
        bookingID: this.booking._id,
        candidate: salon
      }
      this.bookingService.acceptOffer(payload).subscribe(success => {
        console.log(payload);
      },
        error => {
          console.log('Error finding salon');
        });
      this.navCtrl.popToRoot();
    } else {
    }
  }
  /** Navigate to review page */
  public writeReview() {
    this.navCtrl.push(ReviewPagePage, this.booking);

  }
  /** Check whether a booking has a selected salon. */
  private hasSelected() {
    if (this.booking.selected == null) {
      return false;
    } else {
      return true;
    }

  }

}
