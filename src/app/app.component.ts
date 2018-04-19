import { LoginPage } from '../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import firebase from 'firebase';

//import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    /*firebase.initializeApp ({
    apiKey: "AIzaSyATxVkzWbWHlfzym0FFtuaGrxTiz8J0I0Y",
    authDomain: "tpsionic-78ab1.firebaseapp.com",
    databaseURL: "https://tpsionic-78ab1.firebaseio.com",
    projectId: "tpsionic-78ab1",
    storageBucket: "tpsionic-78ab1.appspot.com",
    messagingSenderId: "678513218733"
    });*/
  }
}
