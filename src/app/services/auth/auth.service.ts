import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';


import { BehaviorSubject, Observable } from 'rxjs';

// Firebease
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  credenciales:any;

  constructor(public authFire: AngularFireAuth) {
    this.authStatusListener();
  }

  // Metodo para registrarse
  async onRegister(mail: string, password: string) {
    try {
      await this.authFire.createUserWithEmailAndPassword(mail, password)

      console.log('onRegister: se realizo correctamente la operacion')
    }
    catch (e) {
      console.log(`onRegister: ${e}`)
    }
  }



  // Metodo para logearse
  async onLogin(mail: string, password: string) {
    try {
      await this.authFire.signInWithEmailAndPassword(mail, password)
        .then(e => {
          console.log(e)
        })
      return console.log('onLogin: se realizo correctamente la operacion')
    }
    catch (e) {
      console.log(e)
    }
  }

  // Metodo para logearse con google
  async onLoginGoogle() {
    try {
      return this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider)
    }
    catch (e) {
      return console.log(e)
    }
  }

  // Metodo para salir de la sesion
  async onLogOut() {
    try {
      await this.authFire.signOut();
      return console.log('onLogOut: se realizo correctamente la operacion')
    }
    catch (e) {
      console.log(e)
    }
  }

  // Metodo para obtener el usuario con la sesion activa

  async authState() {
    // try {

    // }
    // catch (error) {
    //   return console.log(error)
    // }
  }

 

  authStatusListener() {

    // esto funciona
    this.authFire.onAuthStateChanged((credential) => {
      this.credenciales = credential;
    })

    return this.credenciales
  }

  user(){

    let user;
    this.authFire.user
    let user2={
      ...this.authFire.user.pipe(
        map(a=>{
          return a;
        })
      )
    }

    return user2;
  }
}
