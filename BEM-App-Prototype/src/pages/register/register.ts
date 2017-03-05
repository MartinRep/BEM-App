import { UserService } from './../../providers/user-service';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { username: '', full_name: '', email: '', password: '', confirm_password: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private userService: UserService) { }

  public register() {
    if (this.registerCredentials.password != this.registerCredentials.confirm_password) {
      this.showPopup("Failure", "Passwords do not match");
    } else {
      this.userService.addUser(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });

    }

  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}