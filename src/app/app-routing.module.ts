import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {
    path:"Home",component:ProductosComponent
  },
  {
    path:"Productos",component:ProductosComponent
  },
  {
    path:"Login",component:LoginComponent
  },
  {
    path:"Register",component:RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
