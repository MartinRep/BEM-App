import { AppSettings } from './app-settings';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * 
 * This class contains most of the interaction functions with the server.
 * 
 * 
 */
@Injectable()
export class UserService {
  /**Variable declaration */
  apiUrl = this.appSettings.getApiURL();
  /**Constructor */
  constructor(public http: Http, public appSettings: AppSettings) {
  }
  /**Get list of users - Admin usage - */
  public getUsers() {
    return this.http.get(this.apiUrl + 'users')
      .map(response => response.json().result);
  }
  /**Add new user - register */
  public addUser(newUser) {
    return this.http.post(this.apiUrl + 'user', newUser)
      .map(response => response.json());
  }
  /**Delete user - Admin usage - */
  public deleteUser(userId) {
    return this.http.delete(this.apiUrl + 'user/' + userId)
      .map(response => response.json());
  }
  /**Find user by username - Utility */
  public findUser(username) {
    return this.http.get(this.apiUrl + 'find/' + username)
      .map(response => response.json());
  }
  /** Log in */
  public login(credentials) {
    return this.http.post(this.apiUrl + 'login', credentials)
      .map(response => response.json());
  }
  /**Get bookings by username */
  public getUserBookings(username) {
    return this.http.get(this.apiUrl + 'bookings/' + username)
      .map(response => response.json());

  }
  /*Place a booking */
  public book(booking) {
    return this.http.post(this.apiUrl + 'book/', booking)
      .map(response => response.json());
  }
  /**Find salon by id - Utility */
  public findSalon(salonID) {
    return this.http.get(this.apiUrl + 'findSalon/' + salonID)
      .map(response => response.json());
  }
  /**Set salon as selected */
  public acceptOffer(payload) {
    return this.http.post(this.apiUrl + 'acceptOffer/', payload)
      .map(response => response.json());
  }
  /**Post a review to a given salon */
  public postReview(review) {
    return this.http.put(this.apiUrl + 'postReview/', review)
      .map(response => response.json());
  }


}

