import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  credito:number;
  constructor(public navCtrl: NavController,public app:App,private auth: AuthService) {
    this.revisarCredito();
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
  public revisarCredito(){
    this.credito = 0;
    //chequear firebase para ver el credito
  }
  public cargarCredito(){
    alert("Cargar Credito!");
  }
}
