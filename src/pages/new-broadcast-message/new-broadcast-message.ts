import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BroadcastMessage } from '../../models/broadcast-messages/broadcast-message.interface'
import { Message } from '../../models/messages/message'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
/**
 * Generated class for the NewBroadcastMessagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-broadcast-message',
  templateUrl: 'new-broadcast-message.html',
})
export class NewBroadcastMessagePage {
  broadcastMessages: FirebaseListObservable<Message[]>;

  @Output() sendMessage: EventEmitter<string>

  content: string;
  constructor(private af_db: AngularFireDatabase) {
    this.sendMessage = new EventEmitter<string>();
    this.broadcastMessages = af_db.list(`/messages`)
  }

  ionViewDidLoad() {
    console.log(this.broadcastMessages)
  }

  send(content: string){
    this.sendMessage.emit(this.content);
    this.content = '';
    let broadcastMessage: BroadcastMessage = {
      content
    }

    this.sendBroadcastMessage(broadcastMessage)
  }

  async sendBroadcastMessage(message: BroadcastMessage){
    await this.af_db.list(`/messages/`).push(message)
  }

}
