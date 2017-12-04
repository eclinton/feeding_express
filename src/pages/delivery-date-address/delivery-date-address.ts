import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../models/produce/produce';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as humanize from 'humanize';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {AuthenticationService} from '../../services/AuthenticationService';
import {FoodBankService} from '../../services/FoodBankService'
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
  item = {} as Produce;
  private orders: FirebaseListObservable<any[]>;
  private products: FirebaseListObservable<any[]>;
  private modify: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af_db: AngularFireDatabase, public alertCtrl: AlertController, 
    public toastCtrl: ToastController, private authService: AuthenticationService, public fb: FoodBankService) {


    this.item = navParams.data;
    this.item.deliveryDate = new Date().toISOString();
    this.orders = af_db.list('/orders');

      if (navParams.get("orderByUser")) {
        console.log("modify case");
        this.modify = true;
      }
    this.products = af_db.list('/products');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryDateAddressPage');
  }

  save() {
    //fetch this item from db
    console.log()
    let item = this.af_db.object('/products/' + this.item.$key, { preserveSnapshot: true }).take(1);
    item.subscribe(snapshot => {
      console.log('/product/' + this.item.$key)
      console.log(snapshot.key)
      console.log(snapshot.val().loadOffered)
      let updated_item = snapshot.val();
      console.log(updated_item.loadOffered)
      console.log(this.item.palletsOrderedCnt)

      if(this.modify)
      {
        //this.item.palletsOrderedCnt -= updated_item.
      }

    //first need to make sure that enough of this produce is available
      if (((updated_item.loadOffered ==0 ) || (this.item.palletsOrderedCnt > updated_item.loadOffered)) ){
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Not enough pallets available',
          buttons: ['OK']
        });
        alert.present();

      }
      else {
        updated_item.loadOffered -= this.item.palletsOrderedCnt;

        this.save_to_db(updated_item)


      }
    })

  }

  update_db()
  {/*
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

  save_to_db(new_item: any) {
    let self = this;
    this.item.date = humanize.time();
    this.item.deliveryDate = new Date(this.item.deliveryDate).toDateString();
    let foo = (domain) => {for(let entry of this.fb.FBS){
                                if(domain == "@"+entry.domain)
                                  {
                                    return entry.name
                                  }
                                  else
                                    {
                                     // console.log(domain)
                                     // console.log(entry.domain)
                                    }
                            }
                            return ""
                          }

    this.item.orderByFB = foo(this.authService.getDomain())
    this.item.orderByUser = this.authService.getUsername()
    this.item.orderByDomain = this.authService.getDomain()
    console.log(this.item.orderByFB)
    console.log(this.item.orderByUser)


    this.orders.push(this.item).then(
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
        
        self.products.update(self.item.$key, new_item).then(
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
