import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { usuario } from '../../clases/usuario';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:string;
  credito:number;
  code100:boolean;
  code50:boolean;
  code10:boolean;

  coleccionTipadaFirebase:AngularFirestoreCollection<usuario>;
  ListadoDeUsuariosObservable:Observable<usuario[]>;
  ListaDeUsuarios:Array<usuario>;

  constructor(public navCtrl: NavController,private objFirebase: AngularFirestore,public navParams: NavParams,public app:App,private auth: AuthService,private barcodeScanner: BarcodeScanner,private toast: Toast) {
    this.ListaDeUsuarios = new Array();
    /*this.code100 = false;
    this.code50 = false;
    this.code10 = false;*/
  }
  ionViewDidEnter(){
    this.coleccionTipadaFirebase= this.objFirebase.collection<usuario>('CargaCredito'); 
    //para el filtrado mirar la documentación https://firebase.google.com/docs/firestore/query-data/queries?authuser=0
    this.ListadoDeUsuariosObservable=this.coleccionTipadaFirebase.valueChanges();
    this.ListadoDeUsuariosObservable.subscribe(x => {
        console.info("conexión correcta con Firebase",x);
        x.forEach(usuario => {
          this.ListaDeUsuarios.push(usuario);
        });
        this.email = this.navParams.get('data');
        this.revisarCredito();
    })

     console.log("fin de ionViewDidEnter");
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
  public revisarCredito(){
    //this.credito = 0;
    //chequear firebase para ver el credito
    this.ListaDeUsuarios.forEach(usu => {
      if (usu.email == this.email) {
        this.credito = usu.credito;
        this.code100 = usu.code100;
        this.code50 = usu.code50;
        this.code10 = usu.code10;
      }
    });
  }
  public cargarCredito(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      switch (barcodeData.text) {
        case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
          //100
          if (!this.code100) {
            this.credito = this.credito + 100;
            this.showToast("Carga Exitosa Usted Cargo: 100");
            this.code100 = true;
            this.updateUsuario();
            this.revisarCredito();
          }
          else{
            this.showToast("Ya uso este codigo!");
          }
        break;
        case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ":
          //50
          if (!this.code50) {
            this.credito = this.credito + 50;
            this.showToast("Carga Exitosa Usted Cargo: 50");
            this.code50 = true;            
            this.updateUsuario();
            this.revisarCredito();
          }
          else{
            this.showToast("Ya uso este codigo!");
          }
        break;
        case "8c95def646b6127282ed50454b73240300dccabc":
          //10
          if (!this.code10) {
            this.credito = this.credito + 10;
            this.showToast("Carga Exitosa Usted Cargo: 10");
            this.code10 = true;
            this.updateUsuario();
            this.revisarCredito();
          }
          else{
            this.showToast("Ya uso este codigo!");
          }
        
        break;
      
        default:
          break;
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }
  showToast(msg){
    this.toast.show(msg, '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
  updateUsuario(){
    let updateUsuario = {
      email: this.email,
      credito: this.credito,
      code100: this.code100,
      code50: this.code50,
      code10: this.code10
    }
    this.coleccionTipadaFirebase.doc(this.email).update({ 
      email: this.email,
      credito: this.credito,
      code100: this.code100,
      code50: this.code50,
      code10: this.code10 });
  }
  
}
