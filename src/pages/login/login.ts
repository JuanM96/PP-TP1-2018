import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';


 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  aux:boolean = false;
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
  public createAccount() {
    this.nav.push(RegistroPage);
  }
 
  /*public login() {
    this.aux = true;
    
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      console.log(allowed);
      if (allowed.h) {        
        this.nav.setRoot(TabsPage);
      } else {
        this.showError("Acceso Denegado");
      }
    },
      error => {
        this.showError(error);
      });
      

  }*/
  public login2() {
    this.aux = true
    this.showLoading();
    this.auth.signInWithEmail(this.registerCredentials)
      .then(
        () => this.nav.setRoot(TabsPage),
        error => this.showError(error.message)//console.log(error.message)
      );
  }
  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.nav.setRoot(TabsPage),
        error => console.log(error.message)
      );
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere Porfavor...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    if (this.aux) {
      this.loading.dismiss();
      
         let alert = this.alertCtrl.create({
           title: 'Error',
           subTitle: text,
           buttons: ['OK']
         });
         alert.present();
    }
  }
}