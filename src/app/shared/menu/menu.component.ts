import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  logged: boolean = false;

  menu: string;
  user: any;
  constructor(private $auth: AuthService, public authFire: AngularFireAuth) {
    this.menu = ''
  }


  estado: boolean = true;
  ngOnInit() {
    // this.estadoUser()
    // funciona
    // body?.classList.add('rojito')
  }

  openMenu() {
    this.menu = 'active'
    let body = document.getElementById("body")
    body?.classList.add('menuOpen')
    console.log(this.menu)
  }

  closeMenu() {
    let body = document.getElementById("body")
    body?.classList.remove('menuOpen')
    this.menu = ''
    console.log(this.menu)

  }














  estadoUser() {
    this.user = this.$auth.authStatusListener()

    if (this.user != null) {
      this.logged = true
    }
    else {
      this.logged = false;
    }
  }

  logOut() {
    this.estadoUser()
    this.$auth.onLogOut()

  }

}
