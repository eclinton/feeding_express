import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../models/produce/produce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import * as humanize from 'humanize';
import { ProduceList } from '../produce-list/produce-list';
import {DeliveryDateAddressPage} from '../delivery-date-address/delivery-date-address';
import {AuthenticationService} from '../../services/AuthenticationService';


/**
 * Generated class for the ConfirmOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
  item = {} as Produce;
  //private orders: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af_db: AngularFireDatabase, public alertCtrl: AlertController, private authService: AuthenticationService) {
    this.item = navParams.data;
    //this.orders = af_db.list('/orders');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmOrderPage');
  }

  save() {
    
    let self = this;
    self.navCtrl.push(DeliveryDateAddressPage, self.item);
    /*
    this.item.date = humanize.time();


    this.orders.push(this.item).then(
      function (resolve) {
        //self.navCtrl.popToRoot();
        self.navCtrl.push(DeliveryDateAddressPage, self.item);
      }

      ,
      function (error) {
        let alert = self.alertCtrl.create({
          title: 'Error',
          subTitle: error.message,
          buttons: ['OK']
        });


        alert.present();


      }
    );
    */


  }

  cancel()
  {
    this.navCtrl.popToRoot();
  }

}
