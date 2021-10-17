import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


// forms
import { ReactiveFormsModule } from '@angular/forms';

// Variables
import { environment } from 'src/environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from'@angular/fire/compat/firestore'

// PrimeNG modules

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import {InputNumberModule} from 'primeng/inputnumber';

// Providers PrimeNg
import { MessageService } from 'primeng/api';

// Componentes
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProductosComponent,
    LoginComponent,
    RegisterComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

    // PrimeNG
    ToastModule,
    ButtonModule,
    RippleModule,
    InputNumberModule
    
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
