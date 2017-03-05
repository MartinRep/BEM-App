import { UserService } from './user-service';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
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
  
 constructor(public userService: UserService, public http: Http) {}

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to backend to make a real check!
        //testing server connection
       this.userService.login(credentials).subscribe(
          response => {
            if(response){

            }
          });

        //end of testing connection
        //let access = (credentials.password === "pass" && credentials.email === "email"); 
        this.currentUser = new User('Albert', 'g00330058@gmit.com');
        observer.next();
        observer.complete();
      });
    }
  }

 
  public getUserInfo() : User {
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