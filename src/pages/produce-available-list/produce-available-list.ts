import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {OrderProducePage} from '../order-produce/order-produce';
import { InboxPage } from '../inbox/inbox';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AddSendNotification } from '../new-message/new-message';
import { TimeAgoPipe } from '../../timeago/timeAgo';
@Component({
  selector: 'page-produce-available-list',
  templateUrl: 'produce-available-list.html'
})
export class ProduceAvailableList {
  private products: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public af_db: AngularFireDatabase) {
    this.products = af_db.list('/products');
  }

  sendNotification() {
    this.navCtrl.push(AddSendNotification);
  }

  public goInbox(): void {
    this.navCtrl.push(InboxPage);
  }

  public orderItem(item: any) {
    this.navCtrl.push(OrderProducePage, item);
  }
}
