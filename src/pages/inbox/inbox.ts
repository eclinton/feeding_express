import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewBroadcastMessagePage } from '../new-broadcast-message/new-broadcast-message'
import { Message } from '../../models/messages/message'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
/**
 * Generated class for the InboxPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
    messages: FirebaseListObservable<Message[]>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private af_db: AngularFireDatabase) {
      this.messages = af_db.list(`/messages`)
    }

  newBroadcastMessage(){
    this.navCtrl.push(NewBroadcastMessagePage)
  }
}
