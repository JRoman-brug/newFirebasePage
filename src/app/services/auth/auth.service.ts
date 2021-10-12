import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';


import { Observable } from 'rxjs';

// Firebease
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user!:Observable<any> 

  constructor(public authFire: AngularFireAuth) {
    // this.user = authFire.currentUser
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

  gerUser(){
  }


  // Metodo para logearse
  async onLogin(mail: string, password: string) {
    try {
      await this.authFire.signInWithEmailAndPassword(mail, password)
      return console.log('onLogin: se realizo correctamente la operacion')
    }
    catch (e) {
      console.log(e)
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

  // Comprueba el estado de usuario (logeado / no logeado)
  stateAuth() {
    return this.authFire.authState.pipe(first()).toPromise()
  }
}
