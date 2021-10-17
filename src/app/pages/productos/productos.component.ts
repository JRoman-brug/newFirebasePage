import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private $messageService: MessageService,
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
    this.$route.navigate(['/EditarProducto',id])    
  }

  // Agrega un producto
  agregar() {
    this.$route.navigate(['AgregarProducto'])
  }

  // Metodo para eliminar un producto
  delete(id: string) {
    this.$db.deleteProducto(id)
    this.eliminoCorrectamente();
  }

  // Toast para eliminar producto
  eliminoCorrectamente() {
    this.$messageService.add({ severity: 'error', summary: 'Se elimino correctamente', detail: 'El producto se elimino correctamente de la base de datos' });
  }

  clear() {
    this.$messageService.clear();
  }
}
