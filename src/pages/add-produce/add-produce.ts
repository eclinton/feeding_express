import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../produce-list/produce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import * as humanize from 'humanize';

import { ProduceList } from '../produce-list/produce-list';

@Component({
  selector: 'page-add-produce',
  templateUrl: 'add-produce.html'
})
export class AddProducePage {
  item = {} as Produce;
  private products: FirebaseListObservable<any[]>;
  private modify: boolean = false;




  constructor(public navCtrl: NavController, public af_db: AngularFireDatabase, public alertCtrl: AlertController, public navParams: NavParams) {
    this.products = af_db.list('/products');
    console.log("just checking!");
    if (navParams.get("$key")) {
      console.log("modify case");
      this.item = navParams.data;
      this.modify = true;
    }


  }

  save() {
    let theNewFood: string = this.item.title;
    if (theNewFood !== '') {
      let self = this;
      this.item.date = humanize.time();
      this.item.icon = `https://png.icons8.com/${theNewFood}/color/48`
      if (this.modify == false) {
        this.products.push(this.item).then(
          function (resolve) {
            self.navCtrl.pop();
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
      }
      else {
        this.products.update(this.item.$key, this.item).then(
          function (resolve) {
            self.navCtrl.pop();
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


      }

    }
  }
}
