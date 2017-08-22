import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { FeedingExpress } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/sample-list/list';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { ProduceList } from '../pages/produce-list/produce-list';
import { AddProducePage } from '../pages/add-produce/add-produce';
import { ReceivedOrders } from '../pages/received-orders/received-orders';
import { AddressBook } from '../pages/address-book/address-book';
import { AddSendNotification } from '../pages/new-message/new-message';
import { SuccessPage } from '../pages/message-success/message-success';
import { ProduceAvailableList} from '../pages/produce-available-list/produce-available-list';
import {OrderProducePage} from '../pages/order-produce/order-produce';
import {ConfirmOrderPage} from '../pages/confirm-order/confirm-order';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from "angularfire2/auth";
import { TimeAgoPipe } from '../timeago/timeAgo';

import { HttpModule} from '@angular/http';
//import { Headers} from '@angular/http';


export const firebaseConfig = {
    apiKey: "AIzaSyDOWbbKmCoVhTLElkpzrjW4q-KEpnbHT2c",
    authDomain: "feedingexpress-af9ec.firebaseapp.com",
    databaseURL: "https://feedingexpress-af9ec.firebaseio.com",
    projectId: "feedingexpress-af9ec",
    storageBucket: "feedingexpress-af9ec.appspot.com",
    messagingSenderId: "1094927539912"
};

@NgModule({
  declarations: [
    FeedingExpress,
    HomePage,
    ListPage,
    LoginPage,
    SignUpPage,
    ProduceList,
    AddProducePage,
    ReceivedOrders,
    AddSendNotification,
    SuccessPage,
    ProduceAvailableList,
    AddressBook,
    TimeAgoPipe,
    OrderProducePage,
    ConfirmOrderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(FeedingExpress),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule//,
   // Headers
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FeedingExpress,
    HomePage,
    ListPage,
    LoginPage,
    SignUpPage,
    ProduceList,
    AddProducePage,
    ReceivedOrders,
    AddSendNotification,
    ProduceAvailableList,
    SuccessPage,
    AddressBook,
    OrderProducePage,
    ConfirmOrderPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
