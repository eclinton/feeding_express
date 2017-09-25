import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodBankService } from '../../services/FoodBankService';
import {ContactPage} from '../contact/contact';


// import { AddProducePage } from '../add-produce/add-produce';

@Component({
  selector: 'page-address-book',
  templateUrl: 'address-book.html'
})
export class AddressBook {
  private items : string[];
  constructor(public navCtrl: NavController, public fb : FoodBankService ) {
    this.items = this.getFbNames();
  }


  getFbNames(){
    return this.fb.FBS.map( n => n.name);

  }

  itemSelected(item : string)
  {
    this.navCtrl.push(ContactPage, item);

  }
}
