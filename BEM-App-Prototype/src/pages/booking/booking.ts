import { BookingService } from './../../providers/booking-service';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage {
  /**Variables */
  booking = { location: '', service: '', date: '', time: '', margin: '', ttime: '' };
  success = false;

  /** Constructor */
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public bookingService: BookingService, ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }


  /**
   * Request booking and call popup.
   */
  public getBooking() {
    this.bookingService.book(this.booking).subscribe(success => {
      if (success) {
        this.showPopup("Success", "Booking placed.");
        this.success = true;
      } else {
        this.showPopup("Error", "Booking failed.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  /**
   * Display popup indicating success or failure.
   */
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.success) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


  /* Return list of locations available **TODO: Implement server side returning list of locations based on db.**  */
  public getLocations() {
    return ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Athlone', 'Clonmel', 'Mulligar', 'Letterkenny', 'Tralee', 'Tullamore', 'Kilkenny', 'Killarney', 'Bray'];
  }
  /* Return list of services available **TODO: Implement server side returning list of services based on db.**  */
  public getServices() {
    return ['Salon / Clinic', 'Hair Salon', 'Dental', 'Gym', 'Spa', 'Nutritionist', 'Personal Trainer', 'Yoga/Pilates'];
  }

  /**
   * Returns list of dates from today,tomorrow and the day after tomorrow.
   */
  public getDates() {
    let date1 = new Date();
    let date2 = new Date();
    date2.setDate(date2.getDate() + 1);
    let date3 = new Date();
    date3.setDate(date3.getDate() + 2);
    return [date1.toLocaleDateString(), date2.toLocaleDateString(), date3.toLocaleDateString()];
  }
  /**
 * Returns list of opening times from.
 */
  public getTimes() {
    return ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  }

  /**
   * Returns list of time margin.
   */
  public getTimeMargin() {
    return ['15', '30'];
  }

  /**
   * Returns list of travel time.
   */
  public getTravelTime() {
    return ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours'];
  }
}

