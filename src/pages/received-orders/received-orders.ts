import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';

// import { AddProducePage } from '../add-produce/add-produce';

@Component({
  selector: 'page-received-orders',
  templateUrl: 'received-orders.html'
})
export class ReceivedOrders {
  private orders: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af_db: AngularFireDatabase, public alertCtrl: AlertController, private authService: AuthenticationService) {
    this.orders = af_db.list('/orders');
    console.log("test")
    console.log(this.authService.getDomain())
    if (this.authService.getDomain() != "@feedingtexas.org") {
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

  public updateStatus(slidingItem: ItemSliding, item:any){
    
  }
}
