import { Component } from '@angular/core';
import { App } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ProduceList } from '../produce-list/produce-list';

import { AngularFireAuth } from "angularfire2/auth"
import { User } from "../../models/user/user";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  user = {} as User;
  error: boolean = false;

  constructor(private afAuth: AngularFireAuth, public appCtrl: App, public alertCtrl: AlertController) {

  }

  join() {

    console.log("joining");
   // this.error = false;


   // try {
    var self = this;
    if (!this.user.email || !this.user.password || !this.user.firstName || !this.user.lastName)
    {
      let alert = self.alertCtrl.create({
          title: 'Error',
          subTitle: "Incomplete input",
          buttons: ['OK']
        });
      alert.present();
      return;

    }
    var result = this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(function(onResolve) {
      console.log("onResolve.");
      self.appCtrl.getRootNav().setRoot(ProduceList);

    }, function(error) {

      // this.error = true;
      var errorCode = error.name;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
      if (errorMessage)
      {
        let alert = self.alertCtrl.create({
          title: 'Error',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present();


      }
    });
      //console.log(this.error);


  //  }
    /*
    catch (e) {
      console.log("done");
      console.log(e.name);
      console.log(e.message);
    }
    */








  }
}
