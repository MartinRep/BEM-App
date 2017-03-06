import { UserService } from './user-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class User {
  username: string;
  email: string;


  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}

export class UserDB {
  constructor() {

  }
}


@Injectable()
export class AuthService {
  currentUser: User;
  userDB: UserDB;

  constructor(public userService: UserService, public http: Http) { }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to backend to make a real check!
        //testing server connection
        this.userService.login(credentials).subscribe(
          data => {
            let access;
            if (data.success) {
              this.currentUser = new User(data.user.username, data.user.email);
              access = true;
            } else {
              access = false;
            }
            observer.next(access);
            observer.complete();
          }, (err) => {
            console.log(err);
          },

          () => {
            console.log("completed");
          }
        );
        //end of testing connection
        //let access = (credentials.password === "pass" && credentials.email === "email"); 
      });
    }
  }


  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}