import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from 'src/app/interfaces/product/product';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos!: any[]
  constructor(
    private $db: FirestoreService,
    private toastr: ToastrService,
    private $primengConfig: PrimeNGConfig,
    private $route: Router
  ) {

    this.$db.getProductos().subscribe((resp => {
      this.productos = resp;
    }))
  }

  ngOnInit(): void {
    this.$primengConfig.ripple = true;
  }

  edit(id: string) {
    this.$route.navigate(['/EditarProducto', id]);

  }

  // Agrega un producto
  agregar() {
    
    this.$route.navigate(['AgregarProducto'])
  }

  // Metodo para eliminar un producto
  delete(id: string) {
    this.$db.deleteProducto(id)
      .then(() => {
        this.showSuccess()
      })
      .catch(e => {
        console.log(e)
      })
  }
  showSuccess() {
    this.toastr.error('Hello world!', 'Toastr fun!',{
      closeButton:true,
      positionClass:'toast-bottom-right'
    });
  }
}
