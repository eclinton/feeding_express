import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProduceAvailableList } from '../produce-available-list/produce-available-list';

@Component({
  selector: 'page-message-success',
  templateUrl: 'message-success.html'
})
export class SuccessPage {
  constructor(public navCtrl: NavController) {}

  produceAvailableList() {
    this.navCtrl.push(ProduceAvailableList);
  }
}
