import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ModalController, Platform, ViewController } from 'ionic-angular';
import { contact } from '../../models/user/contact';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import * as humanize from 'humanize';
import { ItemSliding } from 'ionic-angular';


@Component({
  templateUrl: 'modal-content.html'
})

export class ModalContentPage {
  FBname: string = "";
  c = {} as contact
  private FBContacts: FirebaseListObservable<any[]>;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public af_db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    this.FBname = this.params.get("FBname")
    this.FBContacts = af_db.list("/" + this.FBname);
    if (this.params.get("key")) {
      this.c = this.params.get("data");

    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    let self = this;
    this.c.date = humanize.time();
    if (!this.params.get("key")) {
      this.FBContacts.push(this.c).then(
        function (resolve) {
          let toast = self.toastCtrl.create(

            {
              message: "New contact added",
              duration: 1000,
              position: 'bottom'
            }
          );

          toast.present(toast);
          self.dismiss()
        },
        function (error) {
          let alert = self.alertCtrl.create({
            title: 'Error',
            subTitle: error.message,
            buttons: ['OK']
          });

          alert.present();
        }
      );
    }
    else {

      this.FBContacts.update(this.c.$key, this.c).then(
        function (resolve) {
          self.dismiss();
        },
        function (error) {
          let alert = self.alertCtrl.create({
            title: 'Error',
            subTitle: error.message,
            buttons: ['OK']
          });
          alert.present();
        }
      );
    }

  }


}