import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddSendNotification } from '../new-message/new-message';

@Component({
  selector: 'page-produce-available-list',
  templateUrl: 'produce-available-list.html'
})
export class ProduceAvailableList {
  constructor(public navCtrl: NavController) {}

  sendNotification() {
    this.navCtrl.push(AddSendNotification);
  }
}
