import { Component } from '@angular/core';
import { App, NavController } from 'ionic-angular';

import { SignUpPage } from '../signup/signup';
import { ProduceList } from '../produce-list/produce-list';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public appCtrl: App, public navCtrl: NavController, public alertCtrl: AlertController) {}

  signIn() {
    this.user.email = this.user.username + this.user.domain;
    console.log(this.user.email);
    if (!this.user.email || !this.user.password || !this.user.domain)
    {
      let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: "Incomplete input",
          buttons: ['OK']
        });
      alert.present();
      return;

    }
    var self = this;
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(function(onResolve) {
      console.log("onResolve.");
      self.appCtrl.getRootNav().setRoot(ProduceList, self.user);
    }, function(error) {

      // this.error = true;
      var errorCode = error.name;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      if (errorMessage)
      {
        let alert = self.alertCtrl.create({
          title: 'Error',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present();


      }
    });



  }

  forgotPassword() {}

  signUp() {
    this.navCtrl.push(SignUpPage);
  }
}
