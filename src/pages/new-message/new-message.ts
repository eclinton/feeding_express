import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SuccessPage } from '../message-success/message-success';

@Component({
  selector: 'page-new-message',
  templateUrl: 'new-message.html'
})
export class AddSendNotification {
  constructor(public navCtrl: NavController) {}

  sendMessage() {
    this.navCtrl.push(SuccessPage);
  }
}
