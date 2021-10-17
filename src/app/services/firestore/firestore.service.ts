import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

// Observables library
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

// Intefaces
import { IProduct, IProductId } from '../../interfaces/product/product'
import { ICategoria } from "../../interfaces/product/categoria";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  productos: Observable<IProductId[]>;
  private collection: AngularFirestoreCollection<any>

  constructor(private dbFireStore: AngularFirestore) {
    this.collection = this.dbFireStore.collection<IProduct>('Productos')

    // Llena el array con los documentos de la coleccion
    this.productos = this.collection.snapshotChanges().pipe(
      map(a => a.map(a => {
        const producto: IProductId = {
          id: a.payload.doc.id,
          producto: a.payload.doc.data().producto,
          precio: a.payload.doc.data().precio,
          image: a.payload.doc.data().imagen,
        }
        return producto
      }))
    )

  }


  // Obtiene todos los documentos de la base de datos
  getProductos() {
    return this.productos
  }

  // Obtenien un producto en especifico
  getProducto(id: string) {
    return this.collection.doc(id).snapshotChanges().pipe(
      map(a => {
        const producto: IProductId = {
          id: a.payload.id,
          producto: a.payload.data().producto,
          precio: a.payload.data().precio,
          image: a.payload.data().imagen,
        }
        return producto
      })
    )
  }

  // Agrega un producto
  addProductos(data: IProduct) {
    this.collection.add(data)
  }

  updateProducto(id:string, data:IProduct){
    this.collection.doc(id).update(data)
  }

  // Elimina un documento de la base de datos
  deleteProducto(id: string): Promise<any> {
    return this.collection.doc(id).delete()
  }
}
