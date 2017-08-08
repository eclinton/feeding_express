import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

import { AddProducePage } from '../add-produce/add-produce';
import { AddSendNotification } from '../new-message/new-message';
import { Produce } from './produce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TimeAgoPipe } from '../../timeago/timeAgo';
import * as humanize from 'humanize';

@Component({
  selector: 'page-produce-list',
  templateUrl: 'produce-list.html'
})
export class ProduceList {
  private products: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af_db: AngularFireDatabase, public alertCtrl: AlertController) {
    //af_db.database.ref("/products").orderByChild("date");
    this.products = af_db.list('/products');


    let p = [
      /*
      { title: 'Milk', count: 0, icon: 'https://png.icons8.com/milk-bottle/color/48', price: "$0.060/lb", storage: "Bin" },
      { title: 'Eggs', count: 0, icon: 'https://png.icons8.com/eggs/color/48', price: "$0.060/lb", storage: "Sack" },
      { title: 'Syrup', count: 0, icon: 'https://png.icons8.com/pancake/color/48', price: "$0.060/lb", storage: "Bag" },
      { title: 'Pineapple', count: 0, icon: 'https://png.icons8.com/pineapple/color/48', price: "$0.060/lb", storage: "Bag" }
      */
    ]
    for (let i = 0; i < p.length; i++)
    {
      this.products.push(p[i]);

    }
  }
/*
  addProduce(): void {
    this.navCtrl.push(AddProducePage);
  }
  */

  sendNotification(): void {
    this.navCtrl.push(AddSendNotification);
  }

  public addProduce(): void {
    console.log("debug");
    this.navCtrl.push(AddProducePage);
    /*
    let theNewFood: string = prompt("New Food");
    if (theNewFood !== '') {
      let self = this;
      this.products.push({ title: theNewFood, count: 0, icon: `https://png.icons8.com/${theNewFood}/color/48`, price: "$0.060/lb", storage: "Bin", date: humanize.time() }).catch(
        function(error) {
        let alert = self.alertCtrl.create({
          title: 'Error',
          subTitle: error.message,
          buttons: ['OK']
        });


        alert.present();
      }



      );

    }

*/
  }

  public removeTask(slidingItem: ItemSliding, task: any)
  {

    this.products.remove(task.$key);

    slidingItem.close();

 }

}
