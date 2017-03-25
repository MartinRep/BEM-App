import { BookingService } from './../../providers/booking-service';
import { SalonDetailsPage } from './../salon-details/salon-details';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  bookingName: String;
  booking: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bookingService: BookingService) {
    this.booking = this.navParams.data;
    var b: Date = new Date(this.booking.date);
    //I might have to change how it is stored in the db - Re-check booking form
    this.booking.date = b.toLocaleDateString();
    this.bookingName = this.booking.service + ' in ' + this.booking.location;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingDetailsPage');
    console.log(this.booking);
  }

  private getDetails(salon){
    this.bookingService.loadSalonDetails(salon.salonID).subscribe(success => {
      this.navCtrl.push(SalonDetailsPage, this.bookingService.salon);
    },
      error => {
        console.log('Error finding salon');
      });
    
  }
  private getCandidates(){
    if(this.booking.selected != null){
      return this.booking.selected;
    }else{
      return this.booking.candidates;
    }
  }

  public selectSalon(salon){
    //call server do whatever and reload page?
    let payload={
      bookingID:this.booking._id,
      candidate: salon
    }
    this.bookingService.acceptOffer(payload).subscribe(success => {
       console.log(payload);
    },
      error => {
        console.log('Error finding salon');
      });
   
  }



}
