import {object,string,number, boolean, InferOutput,array} from 'valibot'
export const DraftProductSchema = object({
    name:string(),
    price:number()

})
//estructura del producto que vamos a obtener
//este esquema es para un objeto
export const ProductShema = object({
    id:number(),
    name:string(),
    price:number(),
    availability:boolean()
})
//creamos este esuqema para tener correcto la respuesta de la api, ponemos el esquema de objeto dentro del esquema del array
//respuesta de nuestra api [{}]
export const ProductsSchema = array(ProductShema)
export type Product = InferOutput<typeof ProductShema>