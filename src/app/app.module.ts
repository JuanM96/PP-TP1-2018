import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { SplashAnimadoPage } from '../pages/splash-animado/splash-animado';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
//------------ FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
export const firebaseConfig = {
    apiKey: "AIzaSyAe_Ni8qNd-a6qPUbgKKYKJBBZWRKaTAlM",
    authDomain: "pp-2018-8b015.firebaseapp.com",
    databaseURL: "https://pp-2018-8b015.firebaseio.com/",
    projectId: "pp-2018-8b015",
    storageBucket: "pp-2018-8b015.appspot.com",
    messagingSenderId: "691170251529"
};
//-----------
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    RegistroPage,
    SplashAnimadoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'pp-2018'),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RegistroPage,
    SplashAnimadoPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AngularFireAuth
  ]
})
export class AppModule {}
