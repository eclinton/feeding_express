import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../models/produce/produce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import * as humanize from 'humanize';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ProduceList } from '../produce-list/produce-list';

@Component({
  selector: 'page-add-produce',
  templateUrl: 'add-produce.html'
})
export class AddProducePage {
  item = {} as Produce;
  private infinite : boolean = false;
  private products: FirebaseListObservable<Produce[]>;
  private modify: boolean = false;

  constructor(public navCtrl: NavController, public af_db: AngularFireDatabase, public alertCtrl: AlertController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.products = af_db.list('/products');
    console.log("just checking!");

    if (navParams.get("$key")) {
      console.log("modify case");
      this.item = navParams.data;
      this.modify = true;
      this.infinite = (this.item.loadOffered == Number.MAX_VALUE);
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
        let toast = self.toastCtrl.create(

          {
            message: "New product added",
            duration: 1000,
            position: 'bottom'
          }
        );

        toast.present(toast);
        self.navCtrl.pop();
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

  toTitleCase(str : string){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  save() {
    let theNewFood: string = this.item.title;
    if (theNewFood !== '') {
      this.item.title = this.toTitleCase(theNewFood);

      let self = this;
      this.item.date = humanize.time();
      this.item.estimatedLoadCost = 0;
      this.item.palletsOrderedCnt = 0;
      this.item.pOnum = "none";
      if(this.infinite)
      {
         this.item.loadOffered = Number.MAX_VALUE;
      }

      if (this.modify == false) {
        let h: Headers = new Headers();
        h.append('Accept', 'application/json');

        h.append("Api-Key", "68k448hyfp3sh5berxkfa4d4");
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();

        this.http.get("https://api.gettyimages.com/v3/search/images?phrase=" + theNewFood, { headers: h })
          .map(res => res.json())
          .subscribe(
          response => {
            console.log("good"); //console.dir(JSON.stringify(response));
            console.log("test " + response.images[0].display_sizes[0].uri + " ");
            this.item.icon = response.images[0].display_sizes[0].uri; //this could fail...
            this.push();
            loading.dismiss();

          },
          (error) => {console.log("bad", error);
          loading.dismiss();
        });
      } else {
        this.products.update(this.item.$key, this.item).then(
          function (resolve) {
            self.navCtrl.pop();
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
}
