import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

export class Usuario {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: Usuario;

  private user: firebase.User;
  constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
  }

  public signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}
  
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Porvavor No dejes campos vacios");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (this.signInWithEmail(credentials));
        //let access = (credentials.password.toLowerCase() === "admin" && credentials.email.toLowerCase() === "admin");
        //this.currentUser = new Usuario('admin', 'admin@admin.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Porvavor No dejes campos vacios");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }
 
  public getUserInfo() : Usuario {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
  signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
      .then(() => {
        return this.afAuth.auth.getRedirectResult().then( result => {
          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          let token = result.credential.accessToken;
          // The signed-in user info.
          let user = result.user;
          console.log(token, user);
        }).catch(function(error) {
          // Handle Errors here.
          alert(error.message);
        });
      });
    }
  }
}