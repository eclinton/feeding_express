import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public appCtrl: App) {}

  openLogin() {
    this.appCtrl.getRootNav().setRoot(LoginPage);
  }
}
