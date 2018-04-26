import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
    this.progress = 0;  
    let interval = window.setInterval(() => {
      this.progress = this.progress+1;
      if (this.progress >= 100) {
          window.clearInterval(interval);
      }
    }, 50);
  }
  ionViewDidEnter() {
 
    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 1); // 5000
 
  }


}
