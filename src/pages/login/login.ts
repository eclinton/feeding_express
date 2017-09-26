import { Component } from '@angular/core';
import { App, NavController, ToastController } from 'ionic-angular';

import { SignUpPage } from '../signup/signup';
import { ProduceList } from '../produce-list/produce-list';
import { ProduceAvailableList } from '../produce-available-list/produce-available-list';
import { User } from "../../models/user/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { FoodBankService } from '../../services/FoodBankService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(private authService: AuthenticationService, public appCtrl: App, public navCtrl: NavController, public alertCtrl: AlertController, public fb: FoodBankService) { }

  signIn() {
    this.user.email = this.user.username; //+ this.user.domain;
    this.user.domain = this.user.email.replace(/.*@/, "");
    console.log(this.user.email)
    console.log(this.user.domain)
    if (this.fb.FBS.map(n => n.domain).indexOf(this.user.domain) == -1) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Unauthorized domain",
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    this.user.domain = "@" + this.user.domain
    if (!this.user.email || !this.user.password || !this.user.domain) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: "Incomplete input",
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    var self = this;
    this.authService.setDomain(this.user.domain);
    this.authService.getAuth().auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(function (onResolve) {
      console.log("onResolve.");
      let user = self.authService.getAuth().auth.currentUser;
      if (user.emailVerified || (self.user.email == "admin@feedingtexas.org") || (self.user.email == "admin@foodbank.org")) {
        self.appCtrl.getRootNav().setRoot(ProduceList, self.user);
        return;

      } else {
        let alert = self.alertCtrl.create({
          title: 'Error',
          subTitle: "Email is not verified",
          buttons: ['OK']
        });
        alert.present();
        return;


      }













    }, function (error) {

      var errorCode = error.name;
      var errorMessage = error.message;

      if (errorMessage) {
        let alert = self.alertCtrl.create({
          title: 'Error',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  forgotPassword() { }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }
}
