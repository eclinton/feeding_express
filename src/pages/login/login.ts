import { Component } from '@angular/core';
import { App, NavController, ToastController } from 'ionic-angular';

import { SignUpPage } from '../signup/signup';
import { ProduceList } from '../produce-list/produce-list';
import { ProduceAvailableList } from '../produce-available-list/produce-available-list';
import { User } from "../../models/user/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import {AuthenticationService} from '../../services/AuthenticationService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {} as User;

  constructor(private authService: AuthenticationService, public appCtrl: App, public navCtrl: NavController, public alertCtrl: AlertController) {}

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
    this.authService.setDomain(this.user.domain);
    this.authService.getAuth().auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(function(onResolve) {
      console.log("onResolve.");
      self.appCtrl.getRootNav().setRoot(ProduceList, self.user);
    }, function(error) {

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

  async loginFoodBank(){
    var self = this;
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      console.log(result)
      self.appCtrl.getRootNav().setRoot(ProduceAvailableList);
    }
    catch(e){
      console.error(e);
    }
  }
  forgotPassword() {}

  signUp() {
    this.navCtrl.push(SignUpPage);
  }
}
