import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { IProduct } from 'src/app/interfaces/product/product';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ToastComponent } from 'src/app/shared/toast/toast.component';

export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}


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
    private $route: Router,
    private $storage: StorageService,
    private toast: HotToastService,

  ) {
    this.formulario = $fb.group({
      producto: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.$storage.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }



  showInfoInput() {
    console.log(this.formulario.value)
  }

  // Metodo para agregar el producto
  submit() {

    if (this.formulario.valid) {
      const producto: IProduct = {
        producto: this.formulario.value.producto,
        precio: this.formulario.value.precio,
        image: this.formulario.value.imagen,
        categoria: this.formulario.value.categoria
      }
      this.$db.addProductos(producto)
        .then(() => {
          this.$route.navigate(['Productos'])
        })
    }
    else {
      this.toastAgregoProducto()

      this.errorLlenarCampos()
    }
  }

  // Mensaje de error
  errorLlenarCampos() {

    // this.$messageService.add({ severity: 'error', summary: 'Llene todos los campos', detail: 'Porfavor llene todos los campos para agregar el producto' })
  }

  // Mensaje cuando se agrego correctamente el producto
  toastAgregoProducto() {
    this.toast.show(ToastComponent,{dismissible:true});
    // this.$messageService.add({ severity: 'success', summary: 'Se agrego correctamente', detail: 'El producto se agrego correctamente el producto' })
  }
}
