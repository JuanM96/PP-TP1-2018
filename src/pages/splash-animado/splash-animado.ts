import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SplashAnimadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splash-animado',
  templateUrl: 'splash-animado.html',
})
export class SplashAnimadoPage {
  progress:number;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public splashScreen: SplashScreen) {
    this.progress = 0;  
    let interval = window.setInterval(() => {
      this.progress = this.progress+1;
      if (this.progress >= 100) {
          window.clearInterval(interval);
      }
    }, 50);
  }
  ionViewDidEnter() {
    this.splashScreen.hide();
 
    setTimeout(() => {
      //this.viewCtrl.dismiss();
      this.navCtrl.setRoot(LoginPage)
    }, 6500); // 5000
 
  }


}
