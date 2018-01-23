import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../models/produce/produce';
import { ConfirmOrderPage } from '../confirm-order/confirm-order';
import { FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the OrderProducePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-produce',
  templateUrl: 'order-produce.html',
})
export class OrderProducePage {
  item = {} as Produce;
  combo_list: Produce[];
  temp_combo : Produce[];
  //private pallets : number = 0;
  Tab: string = "Details";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get("ordered_item");
    this.combo_list = navParams.get("combo");
    console.log(this.item.combo)
    console.log("debug1")
    for(let product of this.combo_list)
    {
      console.log(product.loadOffered);
      console.log(product.title);
    }

    /*
        this.combo_list.forEach(c => {
    
          console.log("debug2")
          console.log(c.length)
          for (let i = 0; i < c.length; i++) {
            console.log(c[i].title)
              c[i].palletsOrderedCnt = 0;
              //this.combo_list[0].palletsOrderedCnt = 0;
          }
    
    
    
    
        });*/


    this.item.palletsOrderedCnt = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderProducePage');
  }

  getItems(type: any) {
    return [];
  }

  preOrder(product: Produce) {
    this.temp_combo = this.combo_list.filter(val => (val.palletsOrderedCnt > 0))
    for (let product of this.temp_combo) {
      product.estimatedLoadCost = product.palletsOrderedCnt * 2000 * product.costPerLb;
    }
    if (this.temp_combo.length) {
      this.navCtrl.push(ConfirmOrderPage, { ordered_item: product, combo: this.temp_combo });
    }
  }

  min(a: number, b: number) {
    if (a < b)
      return a;
    else
      return b;
  }



}
