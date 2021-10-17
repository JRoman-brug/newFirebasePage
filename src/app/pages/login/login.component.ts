import { Component, OnInit } from '@angular/core';

// FormBuilder
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// service auth
import { AuthService } from 'src/app/services/auth/auth.service';

// PrimeNg toast
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private $auth: AuthService,
    private $messageService: MessageService,
    private $primengConfig: PrimeNGConfig,
    private $fb: FormBuilder,
    private $route: Router
  ) {
    this.formulario = this.$fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.$primengConfig.ripple = true;
  }

  // Metodo para logearse
  login() {
    const user = {
      email: this.formulario.value.email,
      password: this.formulario.value.password
    };
    this.$auth.onLogin(user.email, user.password)
  }

  // Metodo para logearse con google
  signInGoogle(){
    this.$auth.onLoginGoogle()
    
  }

  // Toast
  contraseñaIncorrecta() {
    this.$messageService.add({ severity: 'error', summary: 'La contraseña no coinciden', detail: 'Escriba de nuevo la contraseña' });
  }

  clear() {
    this.$messageService.clear();
  }
}
