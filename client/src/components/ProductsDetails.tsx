import { formatCurrency } from "../helpers"
import {ActionFunctionArgs, Form,useNavigate,redirect, useFetcher}from 'react-router-dom'
import { Product } from "../types"
import { deleteProducts } from "../services/ProductService"
type ProductDetailsProps = {
    product:Product
}
//accion para eliminar un producto
export async function action({params}:ActionFunctionArgs){
    if(params.id !== undefined){
        await deleteProducts(+params.id)
        return redirect('/')
    }
}

export default function ProductsDetails({product}:ProductDetailsProps) {
    const fetcher = useFetcher()//actualizar sin tener que cambiar de url o vista
    const navigate = useNavigate() //para redireccionar
    const isAvailable = product.availability
  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}

        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {/* usamos fetcher para actualuzar el disponibilidad sin tener que cambiar de vista */}
            <fetcher.Form  method="POST">
                <button 
                type="submit" 
                name="id" 
                value={product.id}
                className={`${isAvailable ? 'text-black':'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                >
                {isAvailable ? 'Disponible':'No disponible'}
                </button>
            </fetcher.Form>
         

        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button onClick={()=> navigate(`/productos/${product.id}/editar`)} className="bg-indigo-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center">
                    Editar
                </button>

                <Form className="w-full" method="POST"
                 action={`productos/${product.id}/eliminar`}
                    // este onsubmit es para que salga una ventana emergente confirmando si se desea eliminae
                    onSubmit={(e)=>{
                    if(!confirm('¿Eliminar?')){
                        e.preventDefault()
                    }
                }}
                >
                    <input type="submit"
                    value='Eliminar'
                    className="bg-red-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center" />
                </Form>
            </div>
        
        </td>
</tr> 
  )
}
