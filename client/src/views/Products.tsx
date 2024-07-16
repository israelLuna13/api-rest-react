import { ActionFunctionArgs, Link,useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService"
import ProductsDetails from "../components/ProductsDetails"
import { Product } from "../types"

//PARA MODIFICAR CON PATCH, NO TENEMOS UNA RUTA ESPECIFICA, LO HACEMOS EN LA RUTA PRINCIPAL
//accion para modificar la disponibilidad
export async function action({request}:ActionFunctionArgs){
  //obtenemos datos del formulario
  const data = Object.fromEntries(await request.formData())
  //modificamos
  await updateProductAvailability(+data.id)
  return {}
}

//funcion para obtener los datos de la api
export async function loader(){
const products = await getProducts()
  return products
}

export default function Products() {
  //con useLoaderData recuperamos los datos que nos regrese la api
  //en este punto quiere decir que se obtuvieron los datos , es por eso que le ponemos as Product[]
  const products = useLoaderData() as Product[]
  
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="products/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product =>(
                <ProductsDetails
                key={product.id}
                product={product}
                
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
