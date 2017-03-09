import { BookingService } from './../providers/booking-service';
import { BookingPage } from './../pages/booking/booking';
import { ManageBookingsPage } from './../pages/manage-bookings/manage-bookings';
import { UserService } from './../providers/user-service';
import { AppSettings } from './../providers/app-settings';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MenuPage,
    BookingPage,
    ManageBookingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    MenuPage,
    BookingPage,
    ManageBookingsPage
  ],
  providers: [UserService, AppSettings, AuthService, BookingService]
})
export class AppModule {}