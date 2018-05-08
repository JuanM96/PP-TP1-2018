import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { RegistroPage } from '../registro/registro';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { usuario } from '../../clases/usuario';

 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  aux:boolean = false;
  coleccionTipadaFirebase:AngularFirestoreCollection<usuario>;
  ListadoDeUsuariosObservable:Observable<usuario[]>;
  ListaDeUsuarios:Array<usuario>;
  constructor(private nav: NavController,private objFirebase: AngularFirestore, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.ListaDeUsuarios = new Array();
   }
 
  public createAccount() {
    this.nav.push(RegistroPage);
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
    })
     console.log("fin de ionViewDidEnter");
    }//fin ionViewDidEnter
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
        () => {
          this.revisarBase(this.registerCredentials.email);
          this.nav.setRoot(HomePage,{data:this.registerCredentials.email});
        },
        error => this.showError(error.message)//console.log(error.message)
      );
  }
  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.nav.setRoot(HomePage),
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
  public ingresoTest(){
    this.registerCredentials.email = "admin@admin.com";
    this.registerCredentials.password = "admin123";
    this.login2();
  }
  public revisarBase(email:string){
    let crearDocumento:boolean = true;
    console.info(this.ListaDeUsuarios);
    this.ListaDeUsuarios.forEach(usu => {
      console.info("TEST: "+usu);
      if (usu.email == email) {
        crearDocumento = false;
      }
    });
    if (crearDocumento) {
      this.crearDocumentoUsuario(email);
    }
  }
  public crearDocumentoUsuario(email){
    let nuevoUsuario:usuario;
    nuevoUsuario= new usuario(email);
    let objetoJsonGenerico= nuevoUsuario.dameJSON();
    console.log ("se guardara: "+objetoJsonGenerico );
    this.objFirebase.collection<usuario>('CargaCredito').doc(email).set(objetoJsonGenerico).then(
     Retorno=>
     {
       //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
       console.log(`id= ${email} ,  email= ${email}`);
     }
     ).catch( error=>{
       console.error(error);
     });
  }
}