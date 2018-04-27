import { LoginPage } from '../pages/login/login';
import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { SplashAnimadoPage } from '../pages/splash-animado/splash-animado';

//import firebase from 'firebase';

//import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SplashAnimadoPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private auth: AuthService,modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      /*let splash = modalCtrl.create(SplashAnimadoPage);
            splash.present();*/
      
    });

  }
}
