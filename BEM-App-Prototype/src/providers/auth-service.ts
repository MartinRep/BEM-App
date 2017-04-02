import { UserService } from './user-service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

export class User {
  username: string;
  email: string;
  user_type: string;


  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}


@Injectable()
export class AuthService {
  currentUser: User;

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
              this.currentUser = data.user;
              access = true;
            } else {
              access = false;
            }
            observer.next(access);
            observer.complete();
          }, (err) => {
            console.log(err);
            observer.next(false);
            observer.complete();
          },
          () => {
            console.log("completed");
          }
        );
        //end of testing connection
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