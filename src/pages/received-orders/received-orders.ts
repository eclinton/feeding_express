import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { Produce } from '../../models/produce/produce';
import {OrderProducePage} from '../order-produce/order-produce';

// import { AddProducePage } from '../add-produce/add-produce';

@Component({
  selector: 'page-received-orders',
  templateUrl: 'received-orders.html'
})
export class ReceivedOrders {
  private orders: FirebaseListObservable<any[]>;
  private pendingOnly: boolean = false;
  private fblogin: boolean = false;
  constructor(public navCtrl: NavController, public af_db: AngularFireDatabase, public alertCtrl: AlertController, private authService: AuthenticationService) {
    this.orders = af_db.list('/orders');
    console.log("test")
    console.log(this.authService.getDomain())
    if (this.authService.getDomain() != "@feedingtexas.org") {
      this.fblogin = true
      this.orders = this.af_db.list('/orders',
        {
          query: {
            orderByChild: 'orderByDomain',
            equalTo: this.authService.getDomain()
          }
        }
      );

    }



  }
  public removeItem(slidingItem: ItemSliding, item: any) {

    this.orders.remove(item.$key);

    if (slidingItem) {
      slidingItem.close();
    }

  }

  public editItem(item: any) {

    //this.navCtrl.push(OrderProducePage, item);



  }

  public updateStatus(item: Produce) {
    console.log("status changed")
    //let obj2 :Produce = {...item} ;

    //obj2.orderDone = !item.orderDone;
    this.orders.update(item.$key, item);

  }

  public updatePendingStatus() {
    //only FT can execute this
    console.log("pending changed")

    if (this.pendingOnly) {
      this.orders = this.af_db.list('/orders',
        {
          query: {
            orderByChild: 'orderDone',
            equalTo: false
          }
        }
      );

    }
    else {
      this.orders = this.af_db.list('/orders')
    }
  }
}
