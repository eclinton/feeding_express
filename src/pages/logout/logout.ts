import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthenticationService} from '../../services/AuthenticationService';
import {HomePage} from '../home/home';
import { App } from 'ionic-angular';
import {ToastController} from 'ionic-angular';

/**
 * Generated class for the LogoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthenticationService, private app: App, public toastCtrl: ToastController ) {
    this.authService.signOut();
    let toast = this.toastCtrl.create(

      {
        message: "Signed out successfully",
        duration: 2000,
        position: 'bottom'
      }
    );

    toast.present(toast);

    this.app.getRootNav().setRoot(HomePage);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
