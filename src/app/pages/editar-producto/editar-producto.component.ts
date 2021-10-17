import { Component, OnInit } from '@angular/core';

// routing
import { ActivatedRoute, Router } from '@angular/router';

// Database firestore
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

// Interface de los productos
import { IProduct } from 'src/app/interfaces/product/product';

// Reactive Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {

  id: any;
  formulario: FormGroup

  constructor(
    private $fb: FormBuilder,
    private $db: FirestoreService,
    private $route: Router,
    private $routeActive: ActivatedRoute
  ) {
    // Inicio el formulario en blanco
    this.formulario = $fb.group({
      producto: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    // Obtengo el id del producto
    this.$routeActive.params.subscribe((id) => {
      this.id = id.id
    })

    // Seteo los inputs con los datos
    this.$db.getProducto(this.id).subscribe(a => {
      this.formulario.patchValue({
        producto: a.producto,
        precio: a.precio,
        imagen: a.image
      })
    })

  }

  // Metedo para aceptar los cambios
  submit() {
    const producto: IProduct = {
      producto: this.formulario.value.producto,
      precio: this.formulario.value.precio,
      image: this.formulario.value.imagen,
    }

    this.$db.updateProducto(this.id, producto)
    
    this.$route.navigate(['Productos'])
  }

}
