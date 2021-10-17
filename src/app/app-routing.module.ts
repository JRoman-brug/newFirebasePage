import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';

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
  {
    path:"AgregarProducto",component:AgregarProductoComponent
  },
  {
    path:"EditarProducto/:id",component:EditarProductoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
