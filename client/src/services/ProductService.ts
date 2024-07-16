import { DraftProductSchema ,Product,ProductsSchema,ProductShema} from "../types";
import { safeParse, number, parse, string, transform, pipe } from "valibot";
import axios from 'axios'
import { toBoolean } from "../helpers";
type ProductData = {
    [k: string]: FormDataEntryValue;
}
//creamos un product en la db
export async function addProduct(data:ProductData){
    try {
                             //esquema del producto
        const result = safeParse(DraftProductSchema,
            //pasamos como objeto los datos
            {
            name:  data.name,
            price: +data.price
        })

        //validmaos si el objeto cumple con el esquema
        if(result.success){
            //url de nuestra api
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            //con axios creamos el producto en la db
            const {data} = await axios.post(url,
                {name:result.output.name,
                price:result.output.price})
        }else{
            throw new Error('Datos no validos')
        }

    } catch (error) {
        console.log(error);
        
    }
    
}
//obtenemos los productos
export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema,data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error);
        
    }
}

//obtenemos los productos
export async function getProductsById(id:Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductShema,data.data)        
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error);
        
    }
}
//actualizar un producto
export async function updateProduct(data:ProductData,id:Product['id']){
   try {
    //creamos un nuevo esquema para convertir el precio de string a numero
    const NumberSchema = pipe(string(), transform(Number), number())
    //validamos la el objeto que vamos a enviar para actualizar
    const result = safeParse(ProductShema,{
        id,
        name:data.name,
        price: parse(NumberSchema, data.price), //convertimos de string a numero
        availability:toBoolean(data.availability.toString())//convertimos de string a bool
    })

    if (result.success){
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.put(url, result.output)
    }
   } catch (error) {
    console.log(error);
    
   }
    
}

//eliminar un producto
export async function deleteProducts(id:Product['id']){
try {
     const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
     await axios.delete(url)
} catch (error) {
}    
}
//modificar un producto
export async function updateProductAvailability(id:Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error);   
    }
}