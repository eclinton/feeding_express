import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../produce-list/produce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import * as humanize from 'humanize';

import { ProduceList } from '../produce-list/produce-list';

@Component({
  selector: 'page-add-produce',
  templateUrl: 'add-produce.html'
})
export class AddProducePage {
  item = {} as Produce;
  private products: FirebaseListObservable<any[]>;
  private modify: boolean = false;




  constructor(public navCtrl: NavController, public af_db: AngularFireDatabase, public alertCtrl: AlertController, public navParams: NavParams, public http: Http) {
    this.products = af_db.list('/products');
    console.log("just checking!");

    if (navParams.get("$key")) {
      console.log("modify case");
      this.item = navParams.data;
      this.modify = true;
    }



  }

  push() {
    let theNewFood: string = this.item.title;
    let self = this;
    if (this.item.icon) {

    }
    else {
      this.item.icon = `https://png.icons8.com/${theNewFood}/color/48`;

    }


    this.products.push(this.item).then(
      function (resolve) {
        self.navCtrl.pop();
      }

      ,
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

  save() {
    let theNewFood: string = this.item.title;
    if (theNewFood !== '') {
      let self = this;
      this.item.date = humanize.time();


      if (this.modify == false) {
        let h: Headers = new Headers();
        h.append('Accept', 'application/json');

        h.append("Api-Key", "68k448hyfp3sh5berxkfa4d4");

        this.http.get("https://api.gettyimages.com/v3/search/images?phrase=" + theNewFood, { headers: h })
          .map(res => res.json())
          .subscribe(
          response => {
            console.log("good"); //console.dir(JSON.stringify(response)); 
            console.log("test " + response.images[0].display_sizes[0].uri + " ");
            this.item.icon = response.images[0].display_sizes[0].uri; //this could fail...
            this.push();

          },
          (error) => console.log("bad", error));


      }
      else {
        this.products.update(this.item.$key, this.item).then(
          function (resolve) {
            self.navCtrl.pop();
          }

          ,
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
}
