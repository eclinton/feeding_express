import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../models/produce/produce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as humanize from 'humanize';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthenticationService } from '../../services/AuthenticationService';
import { FoodBankService } from '../../services/FoodBankService'
import 'rxjs/add/operator/take'

/**
 * Generated class for the DeliveryDateAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-delivery-date-address',
  templateUrl: 'delivery-date-address.html',
})
export class DeliveryDateAddressPage {
  items_combo : Produce[];
  order_details = {} as Produce;
  private orders: FirebaseListObservable<any[]>;
  private products: FirebaseListObservable<any[]>;
  private modify: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af_db: AngularFireDatabase, public alertCtrl: AlertController,
    public toastCtrl: ToastController, private authService: AuthenticationService, public fb: FoodBankService) {


    this.items_combo = navParams.get("combo");
    console.log("in deliverydateaddresspage")
    console.log(this.items_combo)
    for (let entry of this.items_combo) {
      console.log(entry.title)
      entry.deliveryDate = new Date().toISOString();

    }
    

    this.orders = af_db.list('/orders');

    /* if (navParams.get("orderByUser")) {
       console.log("modify case");
       this.modify = true;
     }*/
    this.products = af_db.list('/products');
    console.log("debug")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryDateAddressPage');
  }

  save() {
    //fetch this item from db
    //console.log()
    for (let product of this.items_combo) {
      console.log("AHHHH")
      console.log(product.deliveryDate)
      let item = this.af_db.object('/products/' + product.$key, { preserveSnapshot: true }).take(1);
      item.subscribe(snapshot => {
        console.log('/product/' + product.$key)
        console.log(snapshot.key)
        console.log(snapshot.val().loadOffered)
        let updated_item = snapshot.val();
        console.log(updated_item.loadOffered)
        console.log(product.palletsOrderedCnt)

        if (this.modify) {
          //this.item.palletsOrderedCnt -= updated_item.
        }

        //first need to make sure that enough of this produce is available
        if (((updated_item.loadOffered == 0) || (product.palletsOrderedCnt > updated_item.loadOffered))) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Not enough pallets available',
            buttons: ['OK']
          });
          alert.present();

        }
        else {
          updated_item.loadOffered -= product.palletsOrderedCnt;

          this.save_to_db(updated_item, product)


        }
      })
    }

  }

  update_db() {/*
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
    */
  }

  save_to_db(new_item: any, order : Produce) {
    let self = this;
    order.date = humanize.time();
    order.deliveryDate = this.order_details.deliveryDate;
    order.addressComments = this.order_details.addressComments;
    order.city = this.order_details.city
    order.state = this.order_details.state
    order.zipCode = this.order_details.zipCode
    order.deliveryDate = new Date(order.deliveryDate).toDateString();
    let foo = (domain) => {
      for (let entry of this.fb.FBS) {
        if (domain == "@" + entry.domain) {
          return entry.name
        }
        else {
          // console.log(domain)
          // console.log(entry.domain)
        }
      }
      return ""
    }

    order.orderByFB = foo(this.authService.getDomain())
    order.orderByUser = this.authService.getUsername()
    order.orderByDomain = this.authService.getDomain()
    console.log(order.orderByFB)
    console.log(order.orderByUser)


    this.orders.push(order).then(
      function (resolve) {
        let toast = self.toastCtrl.create(

          {
            message: "Order Placed!",
            duration: 1500,
            position: 'top'
          }
        );

        //update products

        console.log(self.products)
        console.log("foo")
        console.log(new_item.$key)
        console.log(new_item.title)

        self.products.update(order.$key, new_item).then(
          function (resolve) {
            //self.navCtrl.pop();
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

        toast.present(toast);
        self.navCtrl.popToRoot();










        //toast.present(toast);
        //self.navCtrl.popToRoot();
        //self.navCtrl.push(DeliveryDateAddressPage, self.item);
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
