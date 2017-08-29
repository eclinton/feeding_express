import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

// import { AddProducePage } from '../add-produce/add-produce';

@Component({
  selector: 'page-received-orders',
  templateUrl: 'received-orders.html'
})
export class ReceivedOrders {
  private orders: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af_db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.orders = af_db.list('/orders');
  


  }
   public removeItem(slidingItem: ItemSliding, item: any) {

    this.orders.remove(item.$key);

    slidingItem.close();

  }
}
