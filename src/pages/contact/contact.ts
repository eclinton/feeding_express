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
import {ModalContentPage} from '../../pages/contact/modal'
//import {AvatarModule} from "ng2-avatar"

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  FBname: string = "";
  private FBContacts: FirebaseListObservable<any[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public af_db: AngularFireDatabase, public modalCtrl: ModalController) {
    this.FBname = this.navParams.data;
    this.FBContacts = af_db.list("/" + this.FBname);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  addContact() {
    let modal = this.modalCtrl.create(ModalContentPage, { FBname: this.FBname })
    modal.present()

  }

  public editItem(slidingItem: ItemSliding, item: any) {
    if(slidingItem)
    slidingItem.close();
    let modal = this.modalCtrl.create(ModalContentPage, { FBname: this.FBname, key: item.$key, data : item })
    modal.present()
  }


  public removeItem(slidingItem: ItemSliding, item: any) {
    this.FBContacts.remove(item.$key);
    if(slidingItem)
    slidingItem.close();

  }

}


