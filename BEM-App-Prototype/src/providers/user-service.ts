import { AppSettings } from './app-settings';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  apiUrl = this.appSettings.getApiURL();

  constructor(public http: Http, public appSettings: AppSettings) {
  }

  public getUsers() {
    return this.http.get(this.apiUrl + 'users')
      .map(response => response.json().result);
  }

  public addUser(newUser) {
    return this.http.post(this.apiUrl + 'user', newUser)
      .map(response => response.json());
  }

  public deleteUser(userId) {
    return this.http.delete(this.apiUrl + 'user/' + userId)
      .map(response => response.json());
  }

  public findUser(username) {
    return this.http.get(this.apiUrl + 'find/' + username)
      .map(response => response.json());
  }

  public login(credentials) {
    return this.http.post(this.apiUrl + 'login', credentials)
      .map(response => response.json());
  }

  public getUserBookings(username) {
    return this.http.get(this.apiUrl + 'bookings/' + username)
      .map(response => response.json());

  }

  public book(booking) {
    return this.http.post(this.apiUrl + 'book/', booking)
      .map(response => response.json());
  }

  public findSalon(salonID) {
    return this.http.get(this.apiUrl + 'findSalon/' + salonID)
      .map(response => response.json());
  }

  public acceptOffer(payload) {
    return this.http.post(this.apiUrl + 'acceptOffer/', payload)
      .map(response => response.json());
  }

  public postReview(review) {
    return this.http.put(this.apiUrl + 'postReview/', review)
      .map(response => response.json());
  }


}

