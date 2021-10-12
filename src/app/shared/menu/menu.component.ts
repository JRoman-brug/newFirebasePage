import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  logged: boolean = false;
  // user$:Observable<any>;

  constructor(private $auth: AuthService) { }

  async ngOnInit() {
    console.log(this.$auth.gerUser())
    // const user = await this.$auth.stateAuth()
    // if (user) {
    //   this.logged = true
    //   console.log(user)
    // }
    // else {
    //   this.logged = false;
    // }
  }

  logOut() {
    this.$auth.onLogOut()
  }

}
