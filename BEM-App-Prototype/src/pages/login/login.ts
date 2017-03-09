import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { username: '', password: '' };


  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe( allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            console.log(this.auth.getUserInfo().user_type);
            if( this.auth.getUserInfo().user_type == 'customer' ){
                this.nav.setRoot(MenuPage);
            }else{
              this.nav.setRoot(HomePage);
            }    
          });
        } else {
          this.showPopup('Authentication Failed', "Access Denied");
        }
      },
      error => {
        this.showPopup('Error', error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showPopup(title, text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}