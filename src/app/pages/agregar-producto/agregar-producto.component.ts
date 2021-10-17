import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { IProduct } from 'src/app/interfaces/product/product';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {

  formulario: FormGroup
  constructor(
    private $fb: FormBuilder,
    private $db: FirestoreService,
    private $messageService: MessageService,
    private $primengConfig: PrimeNGConfig,
  ) {
    this.formulario = $fb.group({
      producto: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  // Metodo para agregar el producto
  submit() {
    if (this.formulario.valid) {
      const producto: IProduct = {
        producto: this.formulario.value.producto,
        precio:this.formulario.value.precio,
        image:this.formulario.value.imagen,
      }
      this.$db.addProductos(producto)
      console.log(producto)
      console.log('submit')
    }
    else{
      this.errorLlenarCampos()
    }
  }

  // Mensaje de error
  errorLlenarCampos(){
    this.$messageService.add({ severity: 'error', summary: 'Llene todos los campos', detail: 'Porfavor llene todos los campos para agregar el producto' })
  }
}
