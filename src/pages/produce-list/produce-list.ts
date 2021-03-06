import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

import { AddProducePage } from '../add-produce/add-produce';
import { InboxPage } from '../inbox/inbox';
import { OrderProducePage } from '../order-produce/order-produce';
import { AddSendNotification } from '../new-message/new-message';
import { Produce } from '../../models/produce/produce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TimeAgoPipe } from '../../timeago/timeAgo';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as humanize from 'humanize';
import { User } from "../../models/user/user";
import { AuthenticationService } from '../../services/AuthenticationService';
import 'rxjs/add/operator/take';


@Component({
  selector: 'page-produce-list',
  templateUrl: 'produce-list.html'
})
export class ProduceList {
  private products: FirebaseListObservable<any[]>;
  private combo_list: FirebaseListObservable<any[]>;
  private productRef;
  private user = {} as User;
  //private item_ordered_plus_combo : FirebaseListObservable<any[]>;
  private MAX_VALUE: number = Number.MAX_VALUE
  //private searchItems: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public af_db: AngularFireDatabase, public alertCtrl: AlertController, public http: Http, private authService: AuthenticationService) {
    //af_db.database.ref("/products").orderByChild("date");
    this.products = af_db.list('/products');
    this.productRef = af_db.database.ref('/products');
    let foo = this.navParams.get("domain");

    this.user.domain = this.authService.getDomain();

    if (this.user.domain == "@feedingtexas.org") {
      console.log("feedingtexas login!");
    }
    else {
      console.log("foodbank login!");
    }

    let p = [
      /*
      { title: 'Milk', count: 0, icon: 'https://png.icons8.com/milk-bottle/color/48', price: "$0.060/lb", storage: "Bin" },
      { title: 'Eggs', count: 0, icon: 'https://png.icons8.com/eggs/color/48', price: "$0.060/lb", storage: "Sack" },
      { title: 'Syrup', count: 0, icon: 'https://png.icons8.com/pancake/color/48', price: "$0.060/lb", storage: "Bag" },
      { title: 'Pineapple', count: 0, icon: 'https://png.icons8.com/pineapple/color/48', price: "$0.060/lb", storage: "Bag" }
      */
    ]
    for (let i = 0; i < p.length; i++) {
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

  public goInbox(): void {
    this.navCtrl.push(InboxPage);
  }

  public addProduce(): void {
    console.log("debug");
    this.navCtrl.push(AddProducePage);
    //let item = {} as Produce;


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

  public removeItem(slidingItem: ItemSliding, item: any) {
    this.products.remove(item.$key);

    if (slidingItem)
      slidingItem.close();
  }

  public editItem(slidingItem: ItemSliding, item: any) {
    if (slidingItem)
      slidingItem.close();
    this.navCtrl.push(AddProducePage, item)
  }

  public orderItem(item: any) {
    //this.item_ordered_plus_combo.push(item);
    console.log("clicked to order item")

    let data: Produce[] = []

    this.combo_list =
      this.af_db.list('/products',
        {
          query: {
            orderByChild: 'combo',
            equalTo: item.combo
          }
        }
      )


    this.combo_list.take(1).subscribe((combos) => {
      console.log("testing!!!!!!!!!!")
      // this.products.forEach(c => { console.log("Item", c) })
      combos.forEach(
        i => {
          console.log(item.title);
          //i.addressComments = ""
          if (item.combo >= 0) {
            data.push(i)
          }
          else {
            if(item.$key == i.$key)
            {
              data.push(i)
            }

          }

        }
      )
      //console.log(data)
      this.navCtrl.push(OrderProducePage, { ordered_item: item, combo: data });
    }



    );
    /*
        this.combo_list.forEach(c => {
          console.log('Item:', c);
        });
        */

    //this.navCtrl.push(OrderProducePage, { ordered_item: item, combo: this.combo_list });
  }

  toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  public getItems(ev: any) {
    let val = ev.srcElement.value;
    console.log("check");
    console.log(ev.srcElement.value);
    if (val && val.trim() !== '') {
      val = this.toTitleCase(val);
      this.products = this.af_db.list('/products',
        {
          query: {
            orderByChild: 'title',
            startAt: val
          }
        }
      );
    }
    else {
      this.products = this.af_db.list('/products');
    }
  }
}
