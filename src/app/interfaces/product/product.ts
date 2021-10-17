import { ICategoria } from "./categoria";

export interface IProductId extends IProduct{
    id:string
}
export interface IProduct {
    producto:string,
    precio:number,
    image:string,
    // categoria: ICategoria,
}