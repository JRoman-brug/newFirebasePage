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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: []
})
export class RegisterComponent implements OnInit {

  formulario:FormGroup;

  constructor(
    private $auth: AuthService,
    private $messageService:MessageService, 
    private $primengConfig: PrimeNGConfig,
    private $fb: FormBuilder,
    private $route:Router
    ) 
  { 
    this.formulario = this.$fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      passwordConfirm:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.$primengConfig.ripple = true;
  }

  register() {
    const user = {
      email: this.formulario.value.email,
      password: this.formulario.value.password
    };

    if(this.formulario.value.password == this.formulario.value.passwordConfirm){
      this.$auth.onRegister(user.email, user.password)
      // this.$route.navigate(['/Home'])
    }
    else{
      this.contraseñaIncorrecta()
    }
  }

  // Toast

  // Mensaje de contraseña incorrecta 
  contraseñaIncorrecta() {
    this.$messageService.add({ severity: 'error', summary: 'La contraseña no coinciden', detail: 'Escriba de nuevo la contraseña' });
  }

  clear() {
    this.$messageService.clear();
  }
}
